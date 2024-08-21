import { Component, Input, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UniformeCadastro } from '../../models/uniforme-cadastro';
import { UniformeService } from '../../services/uniforme.service';

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
  imports: [MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './lista-uniforme.component.html',
  styleUrl: './lista-uniforme.component.css'
})


export class ListaUniformeComponent implements OnInit{

  constructor(
    private uniformeService : UniformeService
  ) { }

  id?: number;
  id_cadastro?: number;
  nome?: string;
  valor_uniforme?: number;
  qtd_uniforme?: number;
  codigo_uniforme?: number;
  desc_uniforme?: string;

  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'quantidade'];
  uniformeCadastro: UniformeCadastro[] = [];
  dataSource = new MatTableDataSource(this.uniformeCadastro);
  
  ngOnInit(): void {
    this.uniformeService.getAll().subscribe((itens) => {
      this.uniformeCadastro = itens;     
    });
  } 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
