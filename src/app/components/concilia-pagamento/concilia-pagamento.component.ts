import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; import { MatFormField } from '@angular/material/form-field';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
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

  selectedRegistro: any | undefined;
  selectedItem: any | undefined;
  pagamantoUniforme: PagamentoUniforme[] = [];
  itensRecebimento: ItemRecebimento[] | undefined;
  itensExistente: boolean = false;
  valor: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ConciliaPagamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recebimentoService: RecebimentoService,
    ) {
    this.recebimentoService.getItensConciliacao('uniforme', data.uniformeCadastro.id_cadastro).subscribe(result => {
      this.itensRecebimento = result;
      this.itensExistente = this.itensRecebimento.length > 0;
      console.log(data);
    });
  }

  onConfirmUserDialog(): void {
    listaItem.selectedOptions.selected
    this.dialogRef.close(this.data);
  }

  onCancelUserDialog(): void {
    this.dialogRef.close();
  }

  // Método para extrair o primeiro nome
  getFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }
  selecionaItem(item: ItemRecebimento) {
    this.pagamantoUniforme.push({ id_recebimento: item.id_recebimento, id_uniforme_cadastro: this.data.uniformeCadastro.id, valor_pgto: item.valor_pgto });
    this.data.pagamantoUniforme = this.pagamantoUniforme;
  }
}
