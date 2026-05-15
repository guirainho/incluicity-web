package br.com.incluicity.location.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "locais")
@Data 
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(name = "tipo_acessibilidade")
    private String tipoAcessibilidade; // Ex: Rampa, Elevador, Braille

    // Construtores padrão (necessários para o Hibernate)
    public Local() {}

    public Local(String nome, String endereco, String tipoAcessibilidade) {
        this.nome = nome;
        this.endereco = endereco;
        this.tipoAcessibilidade = tipoAcessibilidade;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public String getTipoAcessibilidade() { return tipoAcessibilidade; }
    public void setTipoAcessibilidade(String tipoAcessibilidade) { this.tipoAcessibilidade = tipoAcessibilidade; }
}