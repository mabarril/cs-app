import { Component, LOCALE_ID, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UniformeCadastro } from '../../models/uniforme-cadastro';
import { UniformeService } from '../../services/uniforme.service';
import { CurrencyPipe } from '@angular/common';

// export interface ItemListaUniforme {
//   id: number;
//   nome: string;
//   desc_uniforme: string;
//   qtd_uniforme: number;
//   valor_uniforme: number;
//   vlr_pago: number;
// };


@Component({
  selector: 'app-lista-uniforme',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, CurrencyPipe],
  templateUrl: './lista-uniforme.component.html',
  styleUrl: './lista-uniforme.component.css',
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'pt-BR' }],
})


export class ListaUniformeComponent implements OnInit{

  constructor(
    private uniformeService : UniformeService
  ) { };

  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'quantidade'];
  uniformeCadastro: UniformeCadastro[] = [];
  dataSource = new MatTableDataSource<UniformeCadastro>();  
  ngOnInit(): void {
    this.uniformeService.getAll().subscribe((itens) => {
      this.uniformeCadastro = itens;  
      this.dataSource = new MatTableDataSource(this.uniformeCadastro);   
      console.log(this.uniformeCadastro);
    });
  } 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
