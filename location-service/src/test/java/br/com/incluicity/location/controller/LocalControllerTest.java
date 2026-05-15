package br.com.incluicity.location.controller;

import br.com.incluicity.location.model.Local;
import br.com.incluicity.location.repository.LocalRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest; // Mudou aqui!
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(LocalController.class) // Avisamos o Spring para testar APENAS o Controller
public class LocalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LocalRepository repository; // O Mockito vai criar um "dublê" do banco

    @Test
    public void deveListarTodosOsLocaisComSucesso() throws Exception {
        // Cenário
        Local local = new Local();
        local.setNome("Mackenzie - Prédio 1");
        local.setEndereco("Rua Maria Antônia, 403");

        Mockito.when(repository.findAll()).thenReturn(Arrays.asList(local));

        // Ação e Verificação
        mockMvc.perform(get("/locations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Mackenzie - Prédio 1"));
    }
}