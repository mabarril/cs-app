import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; import { MatFormField } from '@angular/material/form-field';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UniformeCadastro } from '../../models/uniforme-cadastro';
import { RecebimentoService } from '../../services/recebimento.service';
import { ItemRecebimento } from '../../models/item-recebimento';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-concilia-pagamento',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatDialogClose, FormsModule, MatLabel, MatFormField, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './concilia-pagamento.component.html',
  styleUrl: './concilia-pagamento.component.css'
})
export class ConciliaPagamentoComponent {

  selectedRegistro: any | undefined;
  selectedItem: any | undefined;
  registros: any[] = [];
  itensRecebimento: ItemRecebimento[] | undefined;
  itensExistente: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConciliaPagamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recebimentoService : RecebimentoService,
  ) {
      this.recebimentoService.getItensConciliacao('uniforme', data.uniformeCadastro.id_cadastro).subscribe(result => {
        this.itensRecebimento = result;
        this.itensExistente = this.itensRecebimento.length > 0;
      });
  }

  onCancelUserDialog(): void {
    this.dialogRef.close();
  }

}
