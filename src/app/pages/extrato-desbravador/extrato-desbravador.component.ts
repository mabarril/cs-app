import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import ptBr from '@angular/common/locales/pt';
import localePt from '@angular/common/locales/pt';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
registerLocaleData(ptBr);
import { provideNativeDateAdapter } from '@angular/material/core';
import { RegistroService } from '../../services/registro.services';
import { Registro } from '../../models/registro.model';
import { RecebimentoService } from '../../services/recebimento.service';
import { Extrato } from '../../models/extrato.model';
import { ControlePagamentoComponent } from '../pagamento/controle-pagamento/controle-pagamento.component';




@Component({
  selector: 'app-extrato-desbravador',
  standalone: true,
  imports: [MatCard, MatCardModule, MatInputModule, RouterLink, MatButtonModule, MatSelectModule, MatRadioModule, MatDatepickerModule, ReactiveFormsModule, MatListModule, MatIconModule, CurrencyPipe, MatAccordion, MatExpansionModule, MatFormFieldModule, MatIconModule],
  templateUrl: './extrato-desbravador.component.html',
  styleUrl: './extrato-desbravador.component.css',
  providers: [provideNativeDateAdapter(), DatePipe, CurrencyPipe, { provide: LOCALE_ID, useValue: 'pt-BR' }],
})

export class ExtratoDesbravadorComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  dialogRef: any;

  registros: Registro[] = [];
  extrato: Extrato[] | undefined;
  selectedRegistro: Registro = {};
  registro: Registro = {}
  itensExtratos: string[] = ['Mensalidade', 'Eventos', 'Uniforme']
  panelOpenState = false;
  listaMensalidades: Extrato[] = [];
  listaEventos: Extrato[] = [];
  listaUniforme: Extrato[] = [];
  totalPagoMensalidades: number = 0;
  totalPagoUniformes: number = 0;
  totalPagoEventos: number = 0;

  constructor(
    private registroService: RegistroService, private recebimentoService: RecebimentoService, public datePipe: DatePipe, public currencyPipe: CurrencyPipe, public dialog: MatDialog) { };

  ngOnInit(): void {
    this.registroService.getAll().subscribe(registros => {
      this.registros = registros;
    });
  }

  selecionaRegistro(registro: Registro) {
    console.log(registro.id);
    this.recebimentoService.getExtrato(registro.id!).subscribe(result => {
      this.extrato = result;
      this.calculatePaymentsTotal();
    });
  }

  formataData(dataInformada: string) {
    registerLocaleData(localePt);
    let data = new Date(dataInformada);
    let dataFormatada = this.datePipe.transform(data, 'dd/MM/yyyy');
    return dataFormatada;
  }


  calculatePaymentsTotal() {

    this.listaMensalidades = this.extrato ? this.extrato.filter(item => item.item === 'Mensalidade') : [];
    this.listaEventos = this.extrato ? this.extrato.filter(item => item.item == 'Eventos') : [];
    this.listaUniforme = this.extrato ? this.extrato.filter(item => item.item === 'Uniforme') : [];

    console.log(this.listaEventos);

    let totalMensalidade = 0;
    let totalUniforme = 0;
    let totalEventos = 0;

    this.listaMensalidades.forEach(element => {
      totalMensalidade = totalMensalidade + Number(element.valor_item!);
    });

    this.listaUniforme.forEach(element => {
      totalUniforme = totalUniforme + Number(element.valor_item!);
    });

    this.listaEventos.forEach(element => {
      totalEventos = totalEventos + Number(element.valor_item!);
    });
    
    this.totalPagoMensalidades = totalMensalidade;
    this.totalPagoEventos = totalEventos;
    this.totalPagoUniformes = totalUniforme;
  }

  openControlePagamentoDialog() {
    this.dialogRef = this.dialog.open(ControlePagamentoComponent,
      { height: 'calc(max-widht - 90px)', width: '600px', autoFocus: true });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log('O diálogo foi fechado', result);
      // Lógica após fechar o diálogo, se necessário
    });
  }


}
