import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Pagamento } from '../../models/pagamento.model';



@Component({
  selector: 'app-registra-recibo',
  standalone: true,
  imports: [MatButtonModule, MatFormField, FormsModule, MatLabel, MatInputModule, MatSelectModule, MatDialogClose],
  templateUrl: './registra-recibo.component.html',
  styleUrl: './registra-recibo.component.css'
})
export class RegistraReciboComponent {

  constructor(
    public dialogRef: MatDialogRef<RegistraReciboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pagamento,
  ) { }

   onCancelDialog(): void {
    this.dialogRef.close();
  }
}
