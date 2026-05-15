package br.com.incluicity.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.incluicity.auth.model.Usuario;
import br.com.incluicity.auth.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public Usuario registrar(Usuario usuario) {
        // Transforma a senha em um Hash irreversível
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        return repository.save(usuario);
    }

    public boolean autenticar(String email, String senha) {
    System.out.println("Procurando usuário no banco com email: " + email);
    
    return repository.findByEmail(email)
            .map(user -> {
                boolean matches = encoder.matches(senha, user.getSenha());
                System.out.println("Usuário encontrado! Senha bate? " + matches);
                return matches;
            }) 
            .orElseGet(() -> {
                System.out.println("Usuário NÃO encontrado no banco.");
                return false;
            });
    }
}