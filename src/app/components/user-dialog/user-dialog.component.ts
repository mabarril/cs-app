import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatLabel, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RegistroService } from '../../services/registro.services';
import { Registro } from '../../models/registro.model';
import { ItemPago } from '../../models/itemPago.model';


@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatFormField, FormsModule, MatLabel, MatButtonModule, MatInputModule, MatSelectModule, MatDialogClose],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent implements OnInit {

  itens: string[] = ['Mensalidade', 'Eventos', 'Uniforme'];
  registros: Registro[] = [];
  selectedRegistro: Registro | undefined;
  selectedItem: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemPago,
    private registroService: RegistroService,
  ) { }

  ngOnInit(): void {
    this.registroService.getAll().subscribe(registros => {
      this.registros = registros;
    });
  }
  onCancelUserDialog(): void {
    this.dialogRef.close();
  }


}
