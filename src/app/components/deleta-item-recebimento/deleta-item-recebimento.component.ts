import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { Pagamento } from '../../models/pagamento.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-deleta-item-recebimento',
  standalone: true,
  imports: [MatDialogClose, MatButtonModule, MatDialogContent],
  templateUrl: './deleta-item-recebimento.component.html',
  styleUrl: './deleta-item-recebimento.component.css'
})
export class DeletaItemRecebimentoComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletaItemRecebimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pagamento,
  ) { }

   onCancelDialog(): void {
    this.dialogRef.close();
  }

}
