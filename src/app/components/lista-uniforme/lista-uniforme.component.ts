import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UniformeCadastro } from '../../models/uniforme-cadastro';
import { UniformeService } from '../../services/uniforme.service';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConciliaPagamentoComponent } from '../concilia-pagamento/concilia-pagamento.component';
import { ItemRecebimento } from '../../models/item-recebimento';


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
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, CurrencyPipe, MatIconModule, MatButtonModule, MatDialogModule],
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

  displayedColumns: string[] = ['nome', 'descricao', 'valor', 'quantidade', 'acoes'];
  uniformeCadastro: UniformeCadastro[] = [];
  dataSource = new MatTableDataSource<UniformeCadastro>();
  itemRecebimento: ItemRecebimento[] = [];
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

  openPagamentoDialog(item: UniformeCadastro) {
    this.dialogRef = this.dialog.open(ConciliaPagamentoComponent,
      {
        data: {
          uniformeCadastro: item,
          itemRecbimento: this.itemRecebimento
        }, width: '480px', autoFocus: true
      });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result.pagamantoUniforme.length > 0) {
        this.uniformeService.payment(result.pagamantoUniforme).subscribe((res: any) => { console.log(res); });
        alert('Pagamento registrado com sucesso');
      };
    });
  }
}
