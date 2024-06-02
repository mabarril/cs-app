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

export interface itemPago {
  desbravador: number;
  valor: number,
  item: string,
  descricao: string,
};

export interface User {
  name: string;
  city: string;
} 

@Component({
  selector: 'app-controle-pagamento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatListModule],
  templateUrl: './controle-pagamento.component.html',
  styleUrl: './controle-pagamento.component.css'
})

export class ControlePagamentoComponent implements OnInit {



  user = { name: '', city: '' };
  dialogRef: any;


  responsaveis?: Responsavel[];
  selectedResponsavel: string | undefined;
  selectedItem: string | undefined;
  itens: string[] = ['Mensalidade', 'Eventos', 'Uniforme'];
  selectedFormaPagamento: string | undefined;
  formaPagamento: string[] = ['Pix', '7me', 'Dinheiro', 'Cartão'];
  registros: Registro[] = [];

  listaPagamento = ['Mensalidade', 'Eventos', 'Uniforme'];

  constructor(private responsavelService: ResponsavelService, private registroService: RegistroService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.responsavelService.getAll().subscribe(responsaveis => {
      this.responsaveis = responsaveis
    });

    this.registroService.getAll().subscribe(registros => {
      this.registros = registros;
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

  adicionaPagamento() {
    this.listaPagamento.push('Mensalidade');
  }

  openUserDialog() {
    this.dialogRef = this.dialog.open(UserDialogComponent, 
      { data: this.user, height: '480px', width: '600px', autoFocus: true });

    this.dialogRef.afterClosed().subscribe((result: User) => {
      console.log('The User dialog was closed.');
      console.log(result?.name + ' - ' + result?.city);
    });
  }

}
