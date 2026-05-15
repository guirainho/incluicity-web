package br.com.incluicity.review.repository;

import br.com.incluicity.review.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByLocalId(Long localId);
}