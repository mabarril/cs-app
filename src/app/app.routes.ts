import { Routes } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { InscricaoComponent } from './pages/evento/inscricao/inscricao.component';
import { PrestacaoContasComponent } from './pages/recebimento/prestacao-contas/prestacao-contas.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaPrestacaoContasComponent } from './components/lista-prestacao-contas/lista-prestacao-contas.component';
import { PrestacaoContasPdfComponent } from './components/prestacao-contas-pdf/prestacao-contas-pdf.component';
import { ControlePagamentoComponent } from './pages/pagamento/controle-pagamento/controle-pagamento.component';
import { ExemploComponent } from './pages/exemplo/exemplo.component';
import { ExtratoDesbravadorComponent } from './pages/extrato-desbravador/extrato-desbravador.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'evento/inscricao', component: InscricaoComponent },
    { path: 'evento', component: EventosComponent },
    { path: 'recebimento/prestacao-contas', component: PrestacaoContasComponent},
    { path: 'recebimento/relatorio', component: ListaPrestacaoContasComponent},
    { path: 'recebimento/pdf', component: PrestacaoContasPdfComponent},
    { path: 'pagamento/controle', component: ControlePagamentoComponent},
    { path : 'extrato/desbravador', component: ExtratoDesbravadorComponent},
    { path: 'exemplo', component: ExemploComponent},
    
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}

];
