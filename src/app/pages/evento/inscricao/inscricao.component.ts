import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { EventoService } from '../../../services/evento.service';
import { Registro } from '../../../models/registro.model';
import { RegistroService } from '../../../services/registro.services';
import { CommonModule } from '@angular/common';
import { InscricaoEventoService } from '../../../services/inscricao-evento.service';
import { ListaInscricaoComponent } from "../../../components/lista-inscricao/lista-inscricao.component";
import { InscricaoEvento } from '../../../models/inscricao_evento.model';
import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-inscricao',
  standalone: true,
  templateUrl: './inscricao.component.html',
  styleUrl: './inscricao.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, CommonModule, ListaInscricaoComponent,]
})
export class InscricaoComponent implements OnInit {

  eventos?: Evento[];
  registros?: Registro[];
  inscricao_evento?: InscricaoEvento;

  selectedEvento?: Evento;
  selectedRegistro?: Registro;

  constructor(private eventoService: EventoService, private registroService: RegistroService, private inscricaoEventoService: InscricaoEventoService) { }

  ngOnInit(): void {
    this.eventoService.getAll().subscribe((data) => {
      this.eventos = data;
    });

    this.loadAllRegistros();

  }

  private loadAllRegistros() {
    this.registroService.getAll().subscribe((data) => {
      this.registros = data;
    });
  }

  onSubmit(): void {
    if (!this.selectedEvento || !this.selectedRegistro) {
      alert('Por favor, selecione um evento e um participante');
      return;
    }

    this.inscricao_evento = {
      evento: this.selectedEvento,
      cadastro: this.selectedRegistro
    };


    this.inscricaoEventoService.create(this.inscricao_evento).subscribe((data) => {
      this.inscricao_evento = data;
      this.loadAllRegistros();
    }, (error) => {
      alert('Erro ao realizar inscrição. Tente novamente mais tarde.');
      return;
    });

  }
}
