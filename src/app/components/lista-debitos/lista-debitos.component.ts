import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DebitoService } from '../../services/debito.service';
import { Debito } from '../../models/debito.model';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-debitos',
  standalone: true,
  imports: [NgIf, DatePipe, CurrencyPipe, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule],
  templateUrl: './lista-debitos.component.html',
  styleUrl: './lista-debitos.component.css'
})
export class ListaDebitosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'valor', 'vencimento', 'descricao'];
  dataSource!: MatTableDataSource<Debito>;
  clickedRows = new Set<Debito>();
  totalDebito: number = 0;

  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private debitoService: DebitoService,

    public dialogRef: MatDialogRef<ListaDebitosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { };

  ngOnInit(): void {
    console.log(this.clickedRows);
    this.debitoService.getDebitoDesbravador(1473577).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(row: Debito) {
    this.clickedRows.has(row) ? this.clickedRows.delete(row) : this.clickedRows.add(row);
    console.log(this.clickedRows);
    this.getTotalDebito();
  }

  getTotalDebito() {
    let total = 0;
    this.clickedRows.forEach(t => {
      total += t.valor_debito ? t.valor_debito : 0;
    });
    this.totalDebito = total;
  }

  onCancelDialog(): void {
    this.dialogRef.close();
  }

}