package br.com.incluicity.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desabilita o CSRF para aceitar POST do Docker/Postman
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // LIBERA TUDO temporariamente para teste
            )
            .headers(headers -> headers.frameOptions(frame -> frame.disable())); // Útil se usar console H2
        
    return http.build();
    }
}