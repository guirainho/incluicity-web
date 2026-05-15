package br.com.incluicity.auth.controller; // Ajustado para o subpacote

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String healthCheck() {
        return "IncluiCity Auth Service está ONLINE!";
    }
}