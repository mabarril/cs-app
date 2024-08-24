import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';import { MatFormField } from '@angular/material/form-field';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UniformeCadastro } from '../../models/uniforme-cadastro';

@Component({
  selector: 'app-concilia-pagamento',
  standalone: true,
  imports: [MatDialogClose, FormsModule, MatLabel, MatFormField, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './concilia-pagamento.component.html',
  styleUrl: './concilia-pagamento.component.css'
})
export class ConciliaPagamentoComponent {

  selectedRegistro: any | undefined;
  selectedItem: any | undefined;
  registros: any | undefined;

  constructor(
    public dialogRef: MatDialogRef<ConciliaPagamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UniformeCadastro,
  ) { }

  onCancelUserDialog(): void {
    this.dialogRef.close();
  }

}
