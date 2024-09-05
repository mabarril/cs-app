import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; import { MatFormField } from '@angular/material/form-field';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { RecebimentoService } from '../../services/recebimento.service';
import { ItemRecebimento } from '../../models/item-recebimento';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { PagamentoUniforme } from '../../models/pagamentoUniforme';



@Component({
  selector: 'app-concilia-pagamento',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatListModule, MatDialogClose, FormsModule, MatLabel, MatFormField, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './concilia-pagamento.component.html',
  styleUrl: './concilia-pagamento.component.css',
  providers: [DatePipe, CurrencyPipe]
})
export class ConciliaPagamentoComponent {
  @ViewChild('valorPgto') valorPgto!: ElementRef;

  selectedRegistro: any | undefined;
  selectedItem: any | undefined;
  pagamantoUniforme: PagamentoUniforme[] = [];
  itensRecebimento: ItemRecebimento[] | undefined;
  itensExistente: boolean = false;
  valor: number = 0;
  resultado: ItemRecebimento[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConciliaPagamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recebimentoService: RecebimentoService,
  ) {
    let registroPagamento : any[] = [];
    this.recebimentoService.getItensConciliacao('uniforme', data.id_cadastro).subscribe(result => {
      result.forEach(item => {
        var registro = {id_recebimento: item.id_recebimento!, id_uniforme_cadastro: data.id_uniforme_cadastro!, responsavel: item.responsavel!, data: item.data!, valor_item: item.valor_item! };
        registroPagamento.push(registro);
      });
      data.registroPagamento = registroPagamento;
      this.itensExistente = data.registroPagamento.length > 0;
    });
  }


  onInputBlur(id_rec: any, event: any) {
    this.data.registroPagamento.forEach((registro: any) => {
      if (registro.id_recebimento === id_rec) {
        event.target.value = event.target.value.replace(',', '.');
        event.target.value = parseFloat(event.target.value);
        if (isNaN(event.target.value)) {
          event.target.value = 0;
        }
        registro.valor_pgto = event.target.value;
      }
    }
    );   
  }


  onCancelUserDialog(): void {
    this.dialogRef.close();
  }

  // Método para extrair o primeiro nome
  getFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }
}
