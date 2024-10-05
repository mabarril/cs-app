import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CurrencyPipe } from '@angular/common';
import { RecebimentoRegistro } from '../../models/recebimento_registro';
import { Responsavel } from '../../models/responsavel.model';
import { Recebimento } from '../../models/recebimento.model';
import { ItemPago } from '../../models/itemPago.model';
import { Registro } from '../../models/registro.model';
import { AsyncPipe } from '@angular/common';

import { ResponsavelService } from '../../services/responsavel.service';
import { ControleRecebimentoService } from '../../services/controle-recebimento.service';

import { RegistraItemRecebimentoComponent } from '../registra-item-recebimento/registra-item-recebimento';
import { map, startWith, Observable } from 'rxjs';


export interface User {
  name: string;
}

@Component({
  selector: 'app-registra-pagamento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, AsyncPipe, MatAutocompleteModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatListModule, MatIconModule, CurrencyPipe],
  templateUrl: './registra-pagamento.component.html',
  styleUrl: './registra-pagamento.component.css'
})


export class RegistraPagamentoComponent implements OnInit {

  itemPago: ItemPago = {
    desbravador: {} as Registro,
    valor: 0,
  };


  totalPago: number = 0;

  dialogRef: any;

  responsaveis?: Responsavel[];
  selectedResponsavel: Responsavel | undefined;
  selectedItem: string | undefined;
  itens: string[] = ['Mensalidade', 'Eventos', 'Uniforme'];
  selectedFormaPagamento: string | undefined;
  formaPagamento: string[] = ['Pix', '7me', 'Dinheiro', 'Cartão'];
  recebimentoRegistro: RecebimentoRegistro = {} as RecebimentoRegistro;

  listaItensPago: ItemPago[] = [];
  listaResultado: ItemPago[] = [];

  myControl = new FormControl<string | Responsavel>('');
  options!: Responsavel[];
  filteredOptions!: Observable<Responsavel[]>;

  constructor(private responsavelService: ResponsavelService, public dialog: MatDialog, private controleRecebimentoService: ControleRecebimentoService) { }

  ngOnInit(): void {

    

    this.responsavelService.getAll().subscribe(result => {
      this.options = result;
      console.log('resp ', this.options);
    });
  }


  onValueChange() {
    console.log(this.myControl.value);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nome_responsavel;
        console.log(name);
        return name ? this._filter(name as string) : this.options.slice();
      }),
    )
  }

  displayFn(user: Responsavel): string {
    console.log(user);
    return user && user.nome_responsavel ? user.nome_responsavel : '';
  }

  private _filter(name: string): Responsavel[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.nome_responsavel!.toLowerCase().includes(filterValue));
  }


  private fb = inject(FormBuilder);
  controlePagamentoForm = this.fb.group({
    responsavel: [null, Validators.required],
    valor: [null, Validators.required],
    data: [null, Validators.required],
    formaPagamento: [null, Validators.required],
    descricao: null, // não obrigatório
    recibo: [null, Validators.pattern('^[0-9]*$')],
    item: [null, Validators.required]
  });

  limparForm(): void {
    this.controlePagamentoForm.reset();
    this.listaItensPago = [];
    this.selectedFormaPagamento = '';
    this.selectedResponsavel = undefined;
    this.selectedItem = '';
    this.totalPago = 0;
  }

  onSubmit(): void {
    let recebimento: Recebimento = {
      responsavel: this.selectedResponsavel?.nome_responsavel || '',
      data: (this.controlePagamentoForm.value.data as unknown as Date)?.toISOString().split('T')[0]
        || new Date().toISOString().split('T')[0],
      descricao: this.controlePagamentoForm.value.descricao || '',
      forma: this.selectedFormaPagamento || '',
      itens: this.listaItensPago,
      id_recibo: this.controlePagamentoForm.value.recibo || '',
      item: this.selectedItem || '',
    };
    this.controleRecebimentoService.create(recebimento).subscribe((res: Recebimento) => {
      console.log(res);
    });
    alert('Pagamento registrado com sucesso');
    this.limparForm();
  }

  openItemDialog() {
    let data = {} as ItemPago;
    this.dialogRef = this.dialog.open(RegistraItemRecebimentoComponent,
      { data: data, height: 'auto', width: '480px', autoFocus: true });

    this.dialogRef.afterClosed().subscribe((result: ItemPago) => {
      this.adicionarItem(result);
    });
  }

  adicionarItem(itemPago: ItemPago) {
    this.listaItensPago.push(itemPago);
    this.totalPago = this.totalPago + itemPago.valor;
    console.log(this.listaItensPago);
  }

  onResponsavelSelection(resp : Responsavel) {
    this.selectedResponsavel = resp;
    console.log(this.selectedResponsavel);
  }
}

