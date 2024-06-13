import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PrestacaoContasPdfComponent } from '../../../components/prestacao-contas-pdf/prestacao-contas-pdf.component';
import { RecebimentoService } from '../../../services/recebimento.service';
import { Pagamento } from '../../../models/pagamento.model';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CurrencyPipe } from '@angular/common';
import { SortByNamePipe } from '../../../pipes/sort-by-name.pipe';
import { SortByPipe } from '../../../pipes/sort-by.pipe';
const ELEMENT_DATA: Pagamento[] = [];

@Component({
  selector: 'app-lista-pagamentos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, PrestacaoContasPdfComponent, SortByNamePipe],
  templateUrl: './lista-pagamentos.component.html',
  styleUrl: './lista-pagamentos.component.css',
  providers: [DatePipe, CurrencyPipe, { provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class ListaPagamentosComponent {

  // Define the  variable with an empty array or replace it with the desired data source

  lista: Pagamento[] = [];

  constructor(private recebimentoService: RecebimentoService, public datePipe: DatePipe) { };
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
      },
      (error: any) => {
        // Handle the error
        console.error('Error fetching data:', error);
      }
    );    
  }
  ;

  formataData(dataInformada: string) {
    registerLocaleData(localePt);
    let data = new Date(dataInformada);
    let dataFormatada = this.datePipe.transform(data, 'dd/MM/yyyy');
    return dataFormatada;
  }

  displayedColumns: string[] = ['responsavel', 'data', 'valor', 'recibo'];
  dataSource = ELEMENT_DATA;

  formataValor(valor: number) {
    registerLocaleData(localePt, 'br');
    return new CurrencyPipe('pt-BR').transform(valor, 'BRL', 'symbol', '1.2-2');
  };

}
