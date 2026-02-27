package com.example.demo.repository;

import com.example.demo.eventos.Eventos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Eventos,Long> {
}
