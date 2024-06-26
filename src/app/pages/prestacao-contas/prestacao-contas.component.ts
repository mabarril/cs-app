import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecebimentoService } from '../../services/recebimento.service';
import { Extrato } from '../../models/extrato.model';
import { CurrencyPipe } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-prestacao-contas',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, MatInputModule, MatButtonModule, NgxPrintModule],
  templateUrl: './prestacao-contas.component.html',
  styleUrl: './prestacao-contas.component.css',
  providers: [CurrencyPipe],
})
export class PrestacaoContasComponent implements OnInit {


  extrato: Extrato[] = [];

  constructor(private recebimentoService: RecebimentoService) { }
  ngOnInit(): void {
    this.recebimentoService.getItensExtrato().subscribe((data) => {
      this.extrato = data;
      this.dataSource = this.extrato;
    });
  }

  dataSource = this.extrato;
  displayedColumns: string[] = ['nome', 'valor', 'item'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.extrato.filter((item) => (item.nome?.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) || item.item?.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())));
  }

}
