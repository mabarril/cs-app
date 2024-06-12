import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PrestacaoContasPdfComponent } from '../../../components/prestacao-contas-pdf/prestacao-contas-pdf.component';
import { RecebimentoService } from '../../../services/recebimento.service';
import { Pagamento } from '../../../models/pagamento.model';

const ELEMENT_DATA: Pagamento[] = [];

@Component({
  selector: 'app-lista-pagamentos',
  standalone: true,
  imports: [ MatTableModule, MatButtonModule, PrestacaoContasPdfComponent ],
  templateUrl: './lista-pagamentos.component.html',
  styleUrl: './lista-pagamentos.component.css'
})
export class ListaPagamentosComponent {

  // Define the  variable with an empty array or replace it with the desired data source
  
  constructor(private recebimentoService: RecebimentoService) {};
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

  displayedColumns: string[] = ['id', 'responsavel', 'data', 'valor', 'recibo' ];
  dataSource = ELEMENT_DATA;


}
