package br.com.incluicity.auth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.incluicity.auth.model.Usuario;
import br.com.incluicity.auth.service.JwtService;
import br.com.incluicity.auth.service.UsuarioService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService service;

    @Autowired
    private JwtService jwtService; // Injetando o serviço de JWT

    // Endpoint para criar novos usuários
    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        System.out.println("Tentativa de registro para o email: " + usuario.getEmail());
        Usuario novoUsuario = service.registrar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    // Endpoint para autenticação (Login) com retorno de Token JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        System.out.println("Tentativa de login para o email: " + usuario.getEmail());
        
        boolean autenticado = service.autenticar(usuario.getEmail(), usuario.getSenha());
        
        if (autenticado) {
            // Se autenticado, geramos o token
            String token = jwtService.gerarToken(usuario.getEmail());
            
            // Retornamos um JSON: { "token": "valor_do_token" }
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("erro", "Email ou senha inválidos."));
        }
    }
}