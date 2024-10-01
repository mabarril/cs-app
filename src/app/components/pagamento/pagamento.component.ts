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
import { RecebimentoService } from '../../services/recebimento.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Responsavel } from '../../models/responsavel.model';
import { RegistraResponsavelComponent } from '../registra-responsavel/registra-responsavel.component';
import { ResponsavelService } from '../../services/responsavel.service';
import { MatDialog } from '@angular/material/dialog';
import { ListaDebitosComponent } from '../lista-debitos/lista-debitos.component';

export interface RelacaoDebitos {
  nome: string;
  item: string;
  vlrDevido: number;
}

const ELEMENT_DATA: RelacaoDebitos[] = [
  { nome: 'João', item: 'Item 1', vlrDevido: 100.0 },
  { nome: 'Maria', item: 'Item 2', vlrDevido: 200.0 },
  { nome: 'José', item: 'Item 3', vlrDevido: 300.0 },
];

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
    MatIcon,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
})
export class PagamentoComponent {
  displayedColumns: string[] = ['nome', 'item', 'vlrDevido'];
  dataToDisplay = [...ELEMENT_DATA];
  dataSource = new MatTableDataSource<RelacaoDebitos>(this.dataToDisplay);

  disableDebitos = true;

  selectedFormaPagamento: string | undefined;
  formaPagamento: string[] = ['Pix', '7me', 'Dinheiro', 'Cartão'];

  selectedItem: string | undefined;
  itens: string[] = ['Mensalidade', 'Eventos', 'Uniforme'];

  responsaveis?: Responsavel[];
  selectedResponsavel: Responsavel | undefined;
  filteredOptionsResp!: Observable<Responsavel[]>;
  dialogRef: any;

  data = {} as any;

  constructor(
    private registroService: RegistroService,
    private recebimentoService: RecebimentoService,
    private responsavelService: ResponsavelService,
    public dialog: MatDialog
  ) {}

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
    console.log(this.myControl.value);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.nome;
        console.log(name);
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  selecionaRegistro(registro: Registro) {
    registro.id ? (this.disableDebitos = false) : (this.disableDebitos = true);
    this.data = { nome: registro.nome, id: registro.id };
    this.recebimentoService.getExtrato(registro.id!).subscribe((result) => {
      // this.extrato = result;
      // this.calculatePaymentsTotal();
    });
  }

  onResponsavelSelection(resp: Responsavel) {
    this.selectedResponsavel = resp;
    console.log(this.selectedResponsavel);
  }

  openResponsavelDialog() {
    let data = {} as Responsavel;
    this.dialogRef = this.dialog.open(RegistraResponsavelComponent, {
      data: data,
      height: 'auto',
      width: '480px',
      autoFocus: true,
    });

    this.dialogRef.afterClosed().subscribe((result: Responsavel) => {
      result.nome_responsavel = result.nome_responsavel!.toUpperCase();
      this.responsaveis?.push(result);
      this.responsavelService.create(result).subscribe((res: Responsavel) => {
        console.log(res);
      });
    });
  }

  openListaDebitosDialog() {
    this.dialogRef = this.dialog.open(ListaDebitosComponent, {
      data: this.data,
      height: 'auto',
      width: '600px',
      autoFocus: true,
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      //this.adicionarItem(result);
    });
  }
}
