package com.example.demo.Controller;

import com.example.demo.eventos.EventoDTO;
import com.example.demo.eventos.Eventos;
import com.example.demo.eventos.eventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eventos")
public class EventoController {
    @Autowired
    private eventoService servicio;

    @GetMapping
    public List<EventoDTO> obtenerTodosLosEventos(){
        System.out.println(servicio.obtenerTodosLosEventos());
        return servicio.obtenerTodosLosEventos();

    }

    @Transactional
    @PostMapping
    public EventoDTO agregarEvento(@RequestBody EventoDTO datos){
        return servicio.agregarEvento(datos);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        servicio.eliminar(id);
    }


}
