import { Component, Input, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UniformeCadastro } from '../../models/uniforme-cadastro';

export interface itemListaUniforme {
  id: number;
  nome: string;
  desc_uniforme: string;
  qtd_uniforme: number;
  valor_uniforme: number;
  vlr_pago: number;
};

@Component({
  selector: 'app-lista-uniforme',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './lista-uniforme.component.html',
  styleUrl: './lista-uniforme.component.css'
})
export class ListaUniformeComponent implements OnInit{

  @Input() uniformesCadastro : UniformeCadastro[] | undefined;
  
  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'valor_pago', 'quantidade'];
  // dataSource = new MatTableDataSource(this.uniformesCadastro);

  ngOnInit(): void {
    console.log(this.uniformesCadastro)
  } 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
