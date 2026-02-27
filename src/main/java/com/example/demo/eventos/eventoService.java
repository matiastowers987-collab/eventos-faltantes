package com.example.demo.eventos;

import com.example.demo.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class eventoService {
    @Autowired
    private EventoRepository repository;


    public List<EventoDTO> obtenerTodosLosEventos(){
        return convierteDatos(repository.findAll());
    }

    public List<EventoDTO> convierteDatos(List<Eventos> eventos){
        return eventos.stream()
                .map(e -> new EventoDTO(e.getId(),e.getNombre(),e.getFoto()))
                .collect(Collectors.toList());
    }


    public EventoDTO agregarEvento(EventoDTO datos){
        var ev = new Eventos(null,datos.nombre(),datos.foto());
        var guardado = repository.save(ev);
        return new EventoDTO(ev.getId(),guardado.getNombre(),guardado.getFoto());
    }

    public void eliminar(Long id){
        repository.deleteById(id);
    }
}
