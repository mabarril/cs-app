import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RecebimentoRegistro } from '../../models/recebimento_registro';
import { RecebimentoService } from '../../services/recebimento.service';;
import { MatButtonModule } from '@angular/material/button';
import { NgxPrintModule } from 'ngx-print';
import { CurrencyPipe} from '@angular/common';
import localePt from '@angular/common/locales/pt';


const ELEMENT_DATA: RecebimentoRegistro[] = [];

@Component({
  selector: 'app-lista-prestacao-contas',
  standalone: true,
  templateUrl: './lista-prestacao-contas.component.html',
  styleUrl: './lista-prestacao-contas.component.css',
  imports: [MatTableModule, MatButtonModule, NgxPrintModule, CurrencyPipe ],
})


export class ListaPrestacaoContasComponent implements OnInit {
  

  totalSaldo: number = 0;
  totalVlrEvento: number = 0;
  totalVlrPago: number = 0;

  constructor(private recebimentoService: RecebimentoService) { };

  ngOnInit(): void {
    // Call the method to fetch the data from the service
    this.fetchData();
  }

  fetchData(): void {
    // Call the service method to get the data
    this.recebimentoService.getRelatorio().subscribe(
      (data: RecebimentoRegistro[]) => {
        // Assign the received data to the dataSource property
        this.dataSource = data;
        this.calculaTotal();
      },
      (error: any) => {
        // Handle the error
        console.error('Error fetching data:', error);
      }, 
    );
  }
  ;

  displayedColumns: string[] = ['nome', 'evento', 'vlrEvento', 'vlrPago', 'saldo'];
  dataSource = ELEMENT_DATA;


  calculaTotal() {
    this.dataSource.forEach((element: any) => {

      let saldo = parseFloat(element.saldo) ? parseFloat(element.saldo) : 0;
      this.totalSaldo += saldo;
      console.log(this.totalSaldo);

      let vlrEvento = parseFloat(element.vlrEvento) ? parseFloat(element.vlrEvento) : 0;
      this.totalVlrEvento += vlrEvento;

      let vlrPago = parseFloat(element.vlrPago) ? parseFloat(element.vlrPago) : 0;
      this.totalVlrPago += vlrPago;
    });
  }

}
