import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RecebimentoService } from '../../services/recebimento.service';
import { Extrato } from '../../models/extrato.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-prestacao-contas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './prestacao-contas.component.html',
  styleUrl: './prestacao-contas.component.css'
})
export class PrestacaoContasComponent implements OnInit {

  
  extrato: Extrato[] = [];

  constructor(private recebimentoService: RecebimentoService) { }
  ngOnInit(): void {
    this.recebimentoService.getExtrato(0).subscribe((data) => {
      this.extrato = data;
      this.dataSource = this.extrato;
      console.log(this.dataSource);
      
    });
  }

  dataSource = this.extrato;
  displayedColumns: string[] = ['nome', 'data', 'valor_item', 'item'];

}
