import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { CurrencyPipe } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { provideNativeDateAdapter } from '@angular/material/core';


import { RegistroService } from '../../services/registro.services';
import { Registro } from '../../models/registro.model';
import { Recebimento } from '../../models/recebimento.model';
import { RecebimentoService } from '../../services/recebimento.service';

export interface ListaRecebimentos {
  id : number,
  responsavel : string ,
  data : string,
  forma : string,
  descricao : string,
  id_recibo : number,
  valor_item : number,
  item : string,
  nome : string,
  id_cadastro: number
};


@Component({
  selector: 'app-extrato-desbravador',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCard, MatCardModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatDatepickerModule, ReactiveFormsModule, MatListModule, MatIconModule, CurrencyPipe, MatAccordion, MatExpansionModule, MatFormFieldModule, MatIconModule],
  templateUrl: './extrato-desbravador.component.html',
  styleUrl: './extrato-desbravador.component.css'
})

export class ExtratoDesbravadorComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  registros: Registro[] = [];

  listaRecebimentos : ListaRecebimentos[] | undefined;

  selectedRegistro: any;

  panelOpenState = false;

  constructor(
    private registroService: RegistroService, private recebimentoService: RecebimentoService
  ) { }

  ngOnInit(): void {
    this.registroService.getAll().subscribe(registros => {
      this.registros = registros;
    });
    // this.recebimentoService.getExtrato().subscribe(recebimentos => {
    //   this.listaRecebimentos = recebimentos;
    // });


  }


}
