import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export interface User {
  name: string;
  city: string;
} 

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatFormField, FormsModule, MatLabel, MatButtonModule, MatInputModule, MatSelectModule, MatDialogClose ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {

  registros: any = ['Mensalidade', 'Eventos', 'Uniforme'];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }
  onCancelUserDialog(): void {
    this.dialogRef.close();
  }

}
