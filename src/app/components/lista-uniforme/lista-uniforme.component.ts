import { Component, LOCALE_ID, numberAttribute, OnInit } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UniformeCadastro } from '../../models/uniforme-cadastro';
import { UniformeService } from '../../services/uniforme.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConciliaPagamentoComponent } from '../concilia-pagamento/concilia-pagamento.component';
import { ItemRecebimento } from '../../models/item-recebimento';
import { PagamentoUniforme } from '../../models/pagamentoUniforme';
import { CommonModule } from '@angular/common';
import { last } from 'rxjs';


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
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, CurrencyPipe, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './lista-uniforme.component.html',
  styleUrl: './lista-uniforme.component.css',
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'pt-BR' }],
})


export class ListaUniformeComponent implements OnInit {
  dialogRef: any;
  constructor(
    private uniformeService: UniformeService,
    public dialog: MatDialog
  ) { };

  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'quantidade', 'valorPago', 'saldo', 'acoes'];
  uniformeCadastro: UniformeCadastro[] = [];
  dataSource = new MatTableDataSource<UniformeCadastro>();
  itemRecebimento: ItemRecebimento[] = [];
  itemPagamento: PagamentoUniforme[] = [];

  ngOnInit(): void {
    this.fetchUniformData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openPagamentoDialog(item: UniformeCadastro) {

    this.dialogRef = this.dialog.open(ConciliaPagamentoComponent,
      {
        data: { id_cadastro : item.id_cadastro!, id_uniforme_cadastro : item.id! }, width: '600px', autoFocus: true
      });



     this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      let pagamentoUniforme = new PagamentoUniforme;
      result.registroPagamento.forEach((item: any) => {
        if (item.valor_pgto! > 0) {
          pagamentoUniforme.id_uniforme_cadastro = item.id_uniforme_cadastro;
          pagamentoUniforme.id_recebimento = item.id_recebimento;
          pagamentoUniforme.valor_pgto = item.valor_pgto;
          this.itemPagamento.push(pagamentoUniforme);
        }
      });
      this.uniformeService.payment(this.itemPagamento).subscribe((res: any) => { console.log(res); }); 
      alert('Pagamento registrado com sucesso');
      this.fetchUniformData();
  });
  } 

  calcularSaldo(item: any) {
    let saldo = item.valor_uniforme! * item.qtd_uniforme - (item.valor_pgto? item.valor_pgto : 0);
    return saldo;
  } 
  


  fetchUniformData() {
    this.uniformeService.getAll().subscribe((itens) => {
      this.uniformeCadastro = itens;
      this.dataSource = new MatTableDataSource(this.uniformeCadastro);
    });
  }
}
