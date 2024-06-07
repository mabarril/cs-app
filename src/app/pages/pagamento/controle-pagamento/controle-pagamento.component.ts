import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ResponsavelService } from '../../../services/responsavel.service';
import { Responsavel } from '../../../models/responsavel.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { RegistroService } from '../../../services/registro.services';
import { Registro } from '../../../models/registro.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../../components/user-dialog/user-dialog.component';
import { ItemPago } from '../../../models/itemPago.model';
import { RecebimentoRegistro } from '../../../models/recebimento_registro';
import { ControleRecebimentoService } from '../../../services/controle-recebimento.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Recebimento } from '../../../models/recebimento.model';

@Component({
  selector: 'app-controle-pagamento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatListModule, MatIconModule, CurrencyPipe],
  templateUrl: './controle-pagamento.component.html',
  styleUrl: './controle-pagamento.component.css'
})

export class ControlePagamentoComponent implements OnInit {

  itemPago: ItemPago = {
    desbravador: {} as Registro,
    valor: 0,
    item: ''
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

  constructor(private responsavelService: ResponsavelService, public dialog: MatDialog, private controleRecebimentoService: ControleRecebimentoService) { }

  ngOnInit(): void {
    this.responsavelService.getAll().subscribe(responsaveis => {
      this.responsaveis = responsaveis
    });
  }

  // $responsavel = $data["responsavel"];
  // $dtPgto = $data["dtPgto"];
  // $forma = $data["forma"];
  // $descricao = $data["descricao"];
  // $recibo = $data["recibo"];
  // $itens = $data["itens"];

  private fb = inject(FormBuilder);
  controlePagamentoForm = this.fb.group({
    responsavel: [null, Validators.required],
    valor: [null, Validators.required],
    data: [null, Validators.required],
    formaPagamento: [null, Validators.required],
    descricao: [null, Validators.required]
  });

  onSubmit(): void {
    console.log(this.selectedResponsavel);
    let recebimento: Recebimento = {
      responsavel: this.selectedResponsavel?.nome_responsavel || '',
      dtPgto: (this.controlePagamentoForm.value.data as unknown as Date)?.toISOString().split('T')[0]
      || new Date().toISOString().split('T')[0],
      descricao: this.controlePagamentoForm.value.descricao || '',
      forma: this.selectedFormaPagamento || '',
      itens: this.listaItensPago
    };
  
    this.controleRecebimentoService.create(recebimento).subscribe(recebimento => {
      console.log(recebimento);
    });
  
  }

  openUserDialog() {
    let data = {} as ItemPago;
    this.dialogRef = this.dialog.open(UserDialogComponent,
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


}

