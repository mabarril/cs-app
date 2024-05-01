import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { EventoService } from '../../../services/evento.service';
import { Evento } from '/home/barril/workspace/cs-app/src/app/models/evento.model';
import { Registro } from '../../../models/registro.model';
import { RegistroService } from '../../../services/registro.services';
import { CommonModule } from '@angular/common';
import { InscricaoEvento } from '../../../models/inscricao_evento.model';
import { InscricaoEventoService } from '../../../services/inscricao-evento.service';


@Component({
  selector: 'app-inscricao',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './inscricao.component.html',
  styleUrl: './inscricao.component.css'
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
    }, (error) => {
      alert('Erro ao realizar inscrição. Tente novamente mais tarde.');
      return;
    });

    console.log(this.selectedEvento, this.selectedRegistro);
    // Pass these values to your service here
  }


}
