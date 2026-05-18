package br.com.incluicity.location.controller;

import br.com.incluicity.location.model.Local;
import br.com.incluicity.location.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocalController {

    @Autowired
    private LocalRepository repository;

    @PostMapping
    public ResponseEntity<Local> criar(@RequestBody Local local) {
        Local novoLocal = repository.save(local);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoLocal);
    }

    @GetMapping
    public ResponseEntity<List<Local>> listar() {
        List<Local> locais = repository.findAll();
        return ResponseEntity.ok(locais);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Local> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(local -> ResponseEntity.ok(local))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Local> atualizar(@PathVariable Long id, @RequestBody Local localAtualizado) {
        return repository.findById(id).map(local -> {
            local.setNome(localAtualizado.getNome());
            local.setEndereco(localAtualizado.getEndereco());
            local.setTipoAcessibilidade(localAtualizado.getTipoAcessibilidade());
            local.setNotaAcessibilidade(localAtualizado.getNotaAcessibilidade());
            local.setTipo(localAtualizado.getTipo());
            local.setDescricao(localAtualizado.getDescricao());
            return ResponseEntity.ok(repository.save(local));
        }).orElse(ResponseEntity.notFound().build());
    }
}