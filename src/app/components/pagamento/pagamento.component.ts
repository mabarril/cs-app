import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Registro } from '../../models/registro.model';
import { RegistroService } from '../../services/registro.services';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Responsavel } from '../../models/responsavel.model';
import { DebitoService } from '../../services/debito.service';
import { Debito } from '../../models/debito.model';
import { Pagamento } from '../../models/pagamento.model';

export interface RelacaoDebitos {
  id?: number;
  nome?: string;
  item?: string;
  vlrDevido?: number;
  vlrPago?: number;
}

// const ELEMENT_DATA: RelacaoDebitos[] = [
//   { nome: 'João', item: 'Item 1', vlrDevido: 100.0 },
//   { nome: 'Maria', item: 'Item 2', vlrDevido: 200.0 },
//   { nome: 'José', item: 'Item 3', vlrDevido: 300.0 },
// ];

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
    MatIcon,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
})
export class PagamentoComponent {
  displayedColumns: string[] = [
    'vencimento',
    'valor',
    'descricao',
    'valorPago',
  ];
  dataSource: Debito[] = [];

  debitos: Debito[] = [];
  selectedDebito: Debito | undefined;

  relacaoDebitos: RelacaoDebitos[] = [];

  pagamento: Pagamento | undefined;
  pagamentos: Pagamento[] = [];

  selectedFormaPagamento: string | undefined;
  formaPagamento: string[] = ['Pix', '7me', 'Dinheiro', 'Cartão'];

  selectedItem: string | undefined;

  itens: string[] = ['Mensalidade', 'Eventos', 'Uniforme'];

  responsaveis?: Responsavel[];
  selectedResponsavel: Responsavel | undefined;
  filteredOptionsResp!: Observable<Responsavel[]>;
  dialogRef: any;

  data = {} as any;

  totalValue = 0;

  constructor(
    private registroService: RegistroService,
    private debitoService: DebitoService,
  ) { }

  myControl = new FormControl<string | Registro>('');
  options!: Registro[];
  filteredOptions!: Observable<Registro[]>;

  private fb = inject(FormBuilder);
  controlePagamentoForm = this.fb.group({
    responsavel: [null, Validators.required],
    valor: [null, Validators.required],
    data: [null, Validators.required],
    formaPagamento: [null, Validators.required],
    descricao: null, // não obrigatório
    recibo: [null, Validators.pattern('^[0-9]*$')],
    item: [null, Validators.required],
  });

  ngOnInit(): void {
    this.registroService.getAll().subscribe((registros) => {
      this.options = registros;
    });
  }

  displayFn(user: Registro): string {
    console.log(user);
    return user && user.nome ? user.nome : '';
  }

  private _filter(name: string): Registro[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.nome!.toLowerCase().includes(filterValue)
    );
  }

  onValueChange() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.nome;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  calculaPagamento(event: any, debito: Debito) {
    if (event.target.value > 0 && debito) {
      var relDeb = {} as RelacaoDebitos;
      relDeb.id = debito.id;
      // relDeb.item = debito.no
      relDeb.vlrDevido = event.target.value;
    }

    let pagamento = new Pagamento();
    pagamento.valor = debito.valor_debito;
    pagamento.valor_pagamento = Number(event.target.value);
    pagamento.id_debito = debito.id;
    pagamento.data = new Date().toISOString();
    +this.pagamentos.push(pagamento);

    console.log(this.totalValue);
  }
  getTotalCost() {
    return this.totalValue;
  }

  selecionaRegistro(registro: Registro) {
    this.debitoService
      .getDebitoDesbravador(registro.id!)
      .subscribe((debitos) => {
        this.dataSource = debitos;
      });
  }
}
