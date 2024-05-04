import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Inscricao } from '../../../models/inscricao.model';
import { InscricaoEvento } from '../../../models/inscricao_evento.model';
import { InscricaoEventoService } from '../../../services/inscricao-evento.service';
import { EventoService } from '../../../services/evento.service';
import { RegistroService } from '../../../services/registro.services';
import { Evento } from '../../../models/evento.model';
import { Registro } from '../../../models/registro.model';

@Component({
  selector: 'app-prestacao-contas',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatCardModule],
  templateUrl: './prestacao-contas.component.html',
  styleUrl: './prestacao-contas.component.css'
})
export class PrestacaoContasComponent implements OnInit {
  typesOfShoes: string[] = ['BootsBootsBootsBootsBootsBo', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  listaInscricoes?: Inscricao[];
  lista?: InscricaoEvento[] = [];
  eventos?: Evento[];
  registros?: Registro[];

  constructor(private inscricaoEventoService: InscricaoEventoService, private eventoService: EventoService, private registroService: RegistroService) { };

  ngOnInit(): void {

    this.eventoService.getAll().subscribe((data) => {
      this.eventos = data;
    });

    this.registroService.getAll().subscribe((data) => {
      this.registros = data;
    });

    this.inscricaoEventoService.getAll().subscribe((data) => {
      this.listaInscricoes = data;
      this.listaInscricoes?.forEach((linha) => {
        var item: InscricaoEvento = ({
          id: linha.id_evento,
          evento: this.eventos?.find(evento => evento.id_evento == linha.id_evento),
          cadastro: this.registros?.find(registro => registro.id == linha.id_cadastro)
        });
        this.lista?.push(item);
      });
    });
  };
}