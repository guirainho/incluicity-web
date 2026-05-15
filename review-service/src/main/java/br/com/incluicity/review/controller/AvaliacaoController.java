package br.com.incluicity.review.controller;

import br.com.incluicity.review.model.Avaliacao;
import br.com.incluicity.review.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class AvaliacaoController {
    @Autowired
    private AvaliacaoRepository repository;

    @PostMapping
    public Avaliacao criar(@RequestBody Avaliacao avaliacao) {
        return repository.save(avaliacao);
    }

    @GetMapping("/local/{localId}")
    public List<Avaliacao> listarPorLocal(@PathVariable Long localId) {
        return repository.findByLocalId(localId);
    }
}