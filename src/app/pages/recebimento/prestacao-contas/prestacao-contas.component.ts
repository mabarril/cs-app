import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Inscricao } from '../../../models/inscricao.model';
import { InscricaoEvento } from '../../../models/inscricao_evento.model';
import { InscricaoEventoService } from '../../../services/inscricao-evento.service';
import { EventoService } from '../../../services/evento.service';
import { RegistroService } from '../../../services/registro.services';
import { Evento } from '../../../models/evento.model';
import { Registro } from '../../../models/registro.model';
import { RecebimentoService } from '../../../services/recebimento.service';
import { Recibo } from '../../../models/recibo.model';
import { MatListOption } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { RegistroPagamento } from '../../../models/registro_pagamento.model';
import { orderBy } from 'lodash';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-prestacao-contas',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatCardModule, MatListOption, FormsModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './prestacao-contas.component.html',
  styleUrl: './prestacao-contas.component.css'
})


export class PrestacaoContasComponent implements OnChanges, OnInit, AfterViewInit {

  recibos?: Recibo[];

  value = '';

  listaInscricoes?: Inscricao[];
  lista?: InscricaoEvento[] = [];
  eventos?: Evento[];
  registros?: Registro[];
  inscritosSelecionados?: Registro[] = [];

  selectedOptionsRecibo?: any;
  selectedOptionsRegistro?: any;

  reciboSelecionado?: Recibo[];
  registroSelecionado?: Registro[];
  parcela?: number = 0;
  reg: any;
  rec: any;
  nrRecibo: number | undefined = 0;
  registrosPagamentos?: RegistroPagamento[];
  listaFiltrada?: InscricaoEvento[];

  constructor(private inscricaoEventoService: InscricaoEventoService, private eventoService: EventoService, private registroService: RegistroService, private recebimentoService: RecebimentoService) { };

  @ViewChild('inscritos') inscritos?: MatSelectionList;
  @ViewChild('recibo') recibo?: MatSelectionList;

  ngAfterViewInit(): void {
    this.loadEventos();

    this.loadRegistros();

    this.loadRecibos();

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
      this.lista = orderBy(this.lista, ['cadastro.nome'], 'asc');
    });

    this.listaFiltrada = this.lista;

  }

  private loadRecibos() {
    this.recebimentoService.getAll().subscribe((data) => {
      this.recibos = data;
    });
  }

  private loadRegistros() {
    this.registroService.getAll().subscribe((data) => {
      this.registros = data;
    });
  }

  private loadEventos() {
    this.eventoService.getAll().subscribe((data) => {
      this.eventos = data;
    });
  }

  ngOnInit(): void {

  };

  ngOnChanges(changes: SimpleChanges) {
    
  }


  filtraInscritos(valor: string) {
    if (valor.length == 0)  {
      this.listaFiltrada = this.lista;
    } else {
      this.listaFiltrada = this.lista?.filter((item) => {
        return item.cadastro?.nome?.toLowerCase().startsWith(valor.toLowerCase());
      });
    }
    
  }

  registraRecebimento(): void {
    this.reg.forEach((element: any) => {
      console.log(this.rec);
      var registroPagamento = ({
        nr_recibo: this.nrRecibo,
        id_cadastro: element,
        vlr: this.parcela
      });
      var data;
      try {
        this.recebimentoService.create(registroPagamento).subscribe((data) => {
          data = data;
        });
        alert('Pagamento não registrado!');
      } catch (error) {
      }
    });
    this.loadRecibos();
    this.inscritos?.selectedOptions.clear();
  };

  selected(): any {
    this.selectedOptionsRecibo = this.recibo?.selectedOptions.selected;
    this.selectedOptionsRegistro = this.inscritos?.selectedOptions.selected;
    if ((this.selectedOptionsRegistro && this.selectedOptionsRegistro?.length > 0) && (this.selectedOptionsRecibo && this.selectedOptionsRecibo?.length > 0)) {
      this.calculaParcela();
      return false;
    }
    return true;
  };

  calculaParcela() {
    this.rec = this.selectedOptionsRecibo?.map((item: any) => item.value);
    this.reg = this.selectedOptionsRegistro?.map((item: any) => item.value);
    var itemRecibo = this.recibos?.find((recibo) => recibo.id == this.rec);
    var valor = itemRecibo?.vlr_recibo
    var recibo = itemRecibo!.nr_recibo;

    if (valor && this.reg) {
      this.parcela = valor / (this.reg.length);
      this.nrRecibo = recibo;
    }

  }
}
