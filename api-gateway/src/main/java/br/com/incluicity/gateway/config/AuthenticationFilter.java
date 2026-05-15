package br.com.incluicity.gateway.config;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    // A chave deve ser idêntica à do auth-service
    private final String SECRET = "SenhaDoProjetoIncluiCityWeb2026$";

    public AuthenticationFilter() {
        super(Config.class);
    }

    public static class Config {
        // Você pode adicionar propriedades de configuração aqui se necessário
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getURI().getPath();

            // 1. ROTAS PÚBLICAS (Bypass)
            // Permite acessar o login, cadastro e documentação sem exigir Token
            if (path.contains("/auth/login") || 
                path.contains("/auth/register") || 
                path.contains("/v3/api-docs") || 
                path.contains("/swagger-ui")) {
                return chain.filter(exchange);
            }

            // 2. VERIFICAÇÃO DO HEADER DE AUTORIZAÇÃO
            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, HttpStatus.UNAUTHORIZED);
            }

            String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

            // Valida se o formato é "Bearer <token>"
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return onError(exchange, HttpStatus.UNAUTHORIZED);
            }

            // Extrai apenas o token (removendo "Bearer ")
            String token = authHeader.substring(7);

            try {
                // 3. VALIDAÇÃO DO JWT
                Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes()))
                    .build()
                    .parseClaimsJws(token);
                
            } catch (Exception e) {
                // Se o token estiver expirado, for inválido ou a chave for diferente
                return onError(exchange, HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange);
        };
    }

    // Método auxiliar para retornar erro de forma limpa no Spring WebFlux
    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        return response.setComplete();
    }
}