package br.com.incluicity.review.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "avaliacoes")
@Data
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long localId;  // Referência ao ID do local no location-service
    private String usuarioEmail;
    private int nota; // 1 a 5
    private String comentario;
}