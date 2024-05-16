import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { RecebimentoRegistro } from '../../models/recebimento_registro';
import { RecebimentoService } from '../../services/recebimento.service';
import { NgIfContext } from '@angular/common';


const ELEMENT_DATA: RecebimentoRegistro[] = [
  { 
    nome: 'Marcelo Alexandre Barrionuevo', 
    evento: 'Evento 1', 
    vlrEvento: 100, 
    vlrPago: 100, 
    saldo: 0 
  },
  { 
    nome: 'Maria Neide Claro Barrionuevo', 
    evento: 'Evento 2', 
    vlrEvento: 200, 
    vlrPago: 200, 
    saldo: 0 
  },
  { 
    nome: 'José Ribeiro Neto', 
    evento: 'Evento 3', 
    vlrEvento: 300.50, 
    vlrPago: 30, 
    saldo: 30.50

  },
 ];

@Component({
  selector: 'app-lista-prestacao-contas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './lista-prestacao-contas.component.html',
  styleUrl: './lista-prestacao-contas.component.css'
})


export class ListaPrestacaoContasComponent implements OnInit{

  constructor(private recebimentoService: RecebimentoService) {};

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
      },
      (error: any) => {
        // Handle the error
        console.error('Error fetching data:', error);
      }
    );
  }
;

  displayedColumns: string[] = ['nome', 'evento', 'vlrEvento', 'vlrPago', 'saldo'];
  dataSource = ELEMENT_DATA;
}
