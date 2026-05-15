package br.com.incluicity.location.repository;

import br.com.incluicity.location.model.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
    // O JpaRepository já entrega os métodos save(), findAll(), findById() prontos.
}