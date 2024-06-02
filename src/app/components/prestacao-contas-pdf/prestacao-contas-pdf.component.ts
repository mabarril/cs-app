import { Component, Input, OnInit } from '@angular/core';
import { RecebimentoRegistro } from '../../models/recebimento_registro';
import { NgxPrintModule } from 'ngx-print';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prestacao-contas-pdf',
  standalone: true,
  imports: [NgxPrintModule],
  templateUrl: './prestacao-contas-pdf.component.html',
  styleUrl: './prestacao-contas-pdf.component.css'
})
export class PrestacaoContasPdfComponent implements OnInit {


  private sub!: Subscription;

  itens: RecebimentoRegistro[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.itens = params['datasource'];
    });

    console.log(this.sub);

  }
}