import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Responsavel } from '../../models/responsavel.model';


@Component({
  selector: 'app-registra-responsavel',
  standalone: true,
  imports: [MatFormField, FormsModule, MatLabel, MatButtonModule, MatInputModule, MatSelectModule, MatDialogClose],
  templateUrl: './registra-responsavel.component.html',
  styleUrl: './registra-responsavel.component.css'
})
export class RegistraResponsavelComponent {

  constructor(
    public dialogRef: MatDialogRef<RegistraResponsavelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Responsavel,
  ) { }

   onCancelDialog(): void {
    this.dialogRef.close();
  }
}
