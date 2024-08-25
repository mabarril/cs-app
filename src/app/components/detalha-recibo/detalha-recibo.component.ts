import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDialogContent, MatDialogTitle, MatDialogActions, MatDialogClose, } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detalha-recibo',
  standalone: true,
  imports: [NgIf, MatListModule, MatDialogContent, MatDialogTitle, MatDialogActions, MatDialogClose, MatButton],
  templateUrl: './detalha-recibo.component.html',
  styleUrl: './detalha-recibo.component.css'
})


export class DetalhaReciboComponent {

  constructor(
    public dialogRef: MatDialogRef<DetalhaReciboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

}
