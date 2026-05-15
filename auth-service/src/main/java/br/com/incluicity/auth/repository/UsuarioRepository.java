package br.com.incluicity.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.incluicity.auth.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
        Optional<Usuario> findByEmail(String email);
}