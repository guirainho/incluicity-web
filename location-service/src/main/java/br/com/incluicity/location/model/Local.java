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
    private String tipoAcessibilidade;

    @Column
    private Double notaAcessibilidade;

    @Column
    private String tipo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    public Local() {}

    public Local(String nome, String endereco, String tipoAcessibilidade, Double notaAcessibilidade, String tipo, String descricao) {
        this.nome = nome;
        this.endereco = endereco;
        this.tipoAcessibilidade = tipoAcessibilidade;
        this.notaAcessibilidade = notaAcessibilidade;
        this.tipo = tipo;
        this.descricao = descricao;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public String getTipoAcessibilidade() { return tipoAcessibilidade; }
    public void setTipoAcessibilidade(String tipoAcessibilidade) { this.tipoAcessibilidade = tipoAcessibilidade; }
    public Double getNotaAcessibilidade() { return notaAcessibilidade; }
    public void setNotaAcessibilidade(Double notaAcessibilidade) { this.notaAcessibilidade = notaAcessibilidade; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}