import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { InscricaoEventoService } from '../../services/inscricao-evento.service';
import { Inscricao } from '../../models/inscricao.model';
import { Evento } from '../../models/evento.model';
import { Registro } from '../../models/registro.model';
import { InscricaoEvento } from '../../models/inscricao_evento.model';

@Component({
  selector: 'app-lista-inscricao',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './lista-inscricao.component.html',
  styleUrl: './lista-inscricao.component.css'
})
export class ListaInscricaoComponent implements OnChanges {
undo() {
throw new Error('Method not implemented.');
}
save() {
throw new Error('Method not implemented.');
}

  @Input() eventos?: Array<Evento>;
  @Input() registros?: Registro[] = [];

  listaInscricoes?: Inscricao[];
  lista?: InscricaoEvento[] = [];

  constructor(private inscricaoEventoService: InscricaoEventoService) { };


  ngOnChanges(changes: SimpleChanges) {
    if ((changes['eventos'].currentValue !== changes['eventos'].previousValue) ||
      (changes['registros'].currentValue !== changes['registros'].previousValue)) {
      this.inscricaoEventoService.getAll().subscribe((data) => {
        this.listaInscricoes = data;
        this.listaInscricoes?.forEach((linha) => {
          var item : InscricaoEvento = ({
            id: linha.id_evento,
            evento: this.eventos?.find(evento => evento.id_evento == linha.id_evento),
            cadastro: this.registros?.find(registro => registro.id == linha.id_cadastro)
          });
          this.lista?.push(item);
        });
      });
    };
  console.log(this.lista)
  };
}

