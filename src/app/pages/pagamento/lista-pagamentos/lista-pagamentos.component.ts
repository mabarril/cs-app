import { Component, LOCALE_ID } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { RecebimentoService } from '../../../services/recebimento.service';
import { Pagamento } from '../../../models/pagamento.model';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CurrencyPipe } from '@angular/common';
import { SortByNamePipe } from '../../../pipes/sort-by-name.pipe';
import { orderBy } from 'lodash';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { ArrayFiltroPipe } from '../../../pipes/array-filtro.pipe';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { RegistraReciboComponent } from '../../../components/registra-recibo/registra-recibo.component';
import { NumeroRecibo } from '../../../models/numero-recibo';
import { DeletaItemRecebimentoComponent } from '../../../components/deleta-item-recebimento/deleta-item-recebimento.component';
import { ControlePagamentoComponent } from '../controle-pagamento/controle-pagamento.component';
import { DetalhaReciboComponent } from '../../../components/detalha-recibo/detalha-recibo.component';

const ELEMENT_DATA: Pagamento[] = [];

@Component({
  selector: 'app-lista-pagamentos',
  standalone: true,
  imports: [MatTableModule, MatMenuTrigger, MatMenuModule, MatButtonModule, NgxPrintModule, NgClass, MatSelect, MatOption, MatIcon, SortByNamePipe, MatInputModule, MatFormFieldModule, MatPaginator, ArrayFiltroPipe],
  templateUrl: './lista-pagamentos.component.html',
  styleUrl: './lista-pagamentos.component.css',
  providers: [DatePipe, CurrencyPipe, { provide: LOCALE_ID, useValue: 'pt-BR' }]
})

export class ListaPagamentosComponent {


  dialogRef: any;

  selectedItem: string | undefined;
  itens: string[] = ['Mensalidade', 'Eventos', 'Uniforme'];

  // Define the  variable with an empty array or replace it with the desired data source

  displayedColumns: string[] = ['responsavel', 'data', 'item', 'valor', 'recibo', 'acao'];
  dataSource = ELEMENT_DATA;
  selectdItem: any;

  listaOriginal: Pagamento[] | undefined;

  constructor(private recebimentoService: RecebimentoService, public datePipe: DatePipe, public dialog: MatDialog) { };


  ngOnInit(): void {
    // Call the method to fetch the data from the service
    this.fetchData();
  }

  fetchData(): void {
    // Call the service method to get the data
    this.recebimentoService.getLista().subscribe(
      (data: Pagamento[]) => {
        // Assign the received data to the dataSource property
        this.dataSource = data;
        this.dataSource = orderBy(this.dataSource, ['responsavel'], 'asc');
        this.listaOriginal = this.dataSource;
      },
      (error: any) => {
        // Handle the error
        console.error('Error fetching data:', error);
      }
    );
  }

  formataData(dataInformada: string) {
    registerLocaleData(localePt);
    let data = new Date(dataInformada);
    let dataFormatada = this.datePipe.transform(data, 'dd/MM/yyyy');
    return dataFormatada;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    filterValue == '' ? this.fetchData() :
      this.dataSource = this.dataSource.filter(item =>
        item.id_recibo?.toString().includes(filterValue.trim().toUpperCase()) ||
        item.responsavel?.includes(filterValue.trim().toUpperCase())
      );
  }

  formataValor(valor: number) {
    registerLocaleData(localePt, 'br');
    return new CurrencyPipe('pt-BR').transform(valor, 'BRL', 'symbol', '1.2-2');
  };

  selecionaItem() {
    if (this.selectedItem == undefined || this.selectedItem == '') {
      this.dataSource! = this.listaOriginal!;
    } else
      (this.dataSource = this.listaOriginal!.filter(item => item.item?.toLowerCase() == this.selectedItem?.toLowerCase()));
  }

  openDeleteDialog(element: Pagamento) {
    this.dialogRef = this.dialog.open(DeletaItemRecebimentoComponent,
      { data: element, height: 'auto', width: '480px', autoFocus: true });
    this.dialogRef.afterClosed().subscribe((result: Pagamento) => {
      console.log(result.id);
      if (result.id == undefined) {
        return;
      }
      this.recebimentoService.deleteRecebimento(result.id).subscribe((res: any) => {
        console.log(res);
      });
      alert('Recibo removido com sucesso');
      this.fetchData();
      this.selectedItem = '';
      this.selecionaItem();
    });
  }

  openReciboDialog(element: Pagamento) {
    this.dialogRef = this.dialog.open(RegistraReciboComponent,
      { data: element, width: '480px', autoFocus: true });
    this.dialogRef.afterClosed().subscribe((result: Pagamento) => {
      let rec: NumeroRecibo = {};
      rec.id_recibo = result.id_recibo;
      rec.id = result.id;
      console.log(rec);
      this.recebimentoService.insereRecibo(rec).subscribe((res: any) => {
        console.log(res);
      });
      alert('Recibo registrado com sucesso');
      this.fetchData();
      this.selectedItem = '';
      this.selecionaItem();
    });
  }

  openControlePagamentoDialog() {
    this.dialogRef = this.dialog.open(ControlePagamentoComponent,
      { height: 'calc(max-widht - 90px)', width: '600px', autoFocus: true });

    this.dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  detalhaReciboDialog(element: Pagamento) {

    let resultado: any;
    element.id ? this.recebimentoService.getItensRecibo(element.id).subscribe((res: any) => {
      resultado = res;
      this.dialogRef = this.dialog.open(DetalhaReciboComponent,
        { data: resultado, height: 'auto', width: '480px', autoFocus: true });
      console.log(resultado);
    }) : '';
  }

}
