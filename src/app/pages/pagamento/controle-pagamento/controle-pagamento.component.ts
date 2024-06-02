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


@Component({
  selector: 'app-controle-pagamento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatListModule],
  templateUrl: './controle-pagamento.component.html',
  styleUrl: './controle-pagamento.component.css'
})

export class ControlePagamentoComponent implements OnInit {

  itemPago: ItemPago = {
    desbravador: {} as Registro,
    valor: 0,
    item: ''
  };

  dialogRef: any;


  responsaveis?: Responsavel[];
  selectedResponsavel: string | undefined;
  selectedItem: string | undefined;
  itens: string[] = ['Mensalidade', 'Eventos', 'Uniforme'];
  selectedFormaPagamento: string | undefined;
  formaPagamento: string[] = ['Pix', '7me', 'Dinheiro', 'Cartão'];

  listaItensPago: ItemPago[] = [];

  constructor(private responsavelService: ResponsavelService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.responsavelService.getAll().subscribe(responsaveis => {
      this.responsaveis = responsaveis
    });
  }

  private fb = inject(FormBuilder);
  controlePagamentoForm = this.fb.group({
    responsavel: [null, Validators.required],
    valor: [null, Validators.required],
    data: [null, Validators.required],
    formaPagamento: [null, Validators.required],
    status: [null, Validators.required],
    comprovante: [null, Validators.required],
    observacao: [null, Validators.required]
  });

  onSubmit(): void {
    alert('Thanks!');
  }

  openUserDialog() {
    this.dialogRef = this.dialog.open(UserDialogComponent,
      { data: this.itemPago, height: 'auto', width: '480px', autoFocus: true });

    this.dialogRef.afterClosed().subscribe((result: ItemPago) => {
      this.listaItensPago.push(result);
    });
  }

}
