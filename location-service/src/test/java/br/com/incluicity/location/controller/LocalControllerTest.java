package br.com.incluicity.location.controller;

import br.com.incluicity.location.model.Local;
import br.com.incluicity.location.repository.LocalRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LocalController.class)
public class LocalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LocalRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void deveListarTodosOsLocaisComSucesso() throws Exception {
        // Cenário
        Local local = new Local("Mackenzie - Prédio 1", "Rua Maria Antônia, 403", "Rampa", 4.5, "Educação", "Campus principal");
        local.setId(1L);

        Mockito.when(repository.findAll()).thenReturn(Arrays.asList(local));

        // Ação e Verificação
        mockMvc.perform(get("/locations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Mackenzie - Prédio 1"));
    }

    @Test
    public void deveCriarLocalComSucesso() throws Exception {
        // Cenário
        Local local = new Local("Parque Ibirapuera", "Av Pedro Alvares Cabral", "Piso Tátil", 5.0, "Lazer", "Parque acessível");
        local.setId(2L);

        Mockito.when(repository.save(Mockito.any(Local.class))).thenReturn(local);

        // Ação e Verificação
        mockMvc.perform(post("/locations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(local)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Parque Ibirapuera"));
    }

    @Test
    public void deveBuscarLocalPorIdComSucesso() throws Exception {
        // Cenário
        Local local = new Local("Mackenzie - Prédio 1", "Rua Maria Antônia, 403", "Rampa", 4.5, "Educação", "Campus principal");
        local.setId(1L);

        Mockito.when(repository.findById(1L)).thenReturn(Optional.of(local));

        // Ação e Verificação
        mockMvc.perform(get("/locations/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Mackenzie - Prédio 1"));
    }

    @Test
    public void deveRetornar404QuandoLocalNaoExistir() throws Exception {
        // Cenário
        Mockito.when(repository.findById(99L)).thenReturn(Optional.empty());

        // Ação e Verificação
        mockMvc.perform(get("/locations/99"))
                .andExpect(status().isNotFound());
    }
}