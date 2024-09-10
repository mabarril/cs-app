import { Routes } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { InscricaoComponent } from './pages/evento/inscricao/inscricao.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaPrestacaoContasComponent } from './components/lista-prestacao-contas/lista-prestacao-contas.component';
import { RegistraPagamentoComponent } from './components/registra-pagamento/registra-pagamento.component';
import { ExtratoDesbravadorComponent } from './pages/extrato-desbravador/extrato-desbravador.component';
import { ListaPagamentosComponent } from './components/lista-pagamentos/lista-pagamentos.component';
import { PrestacaoContasComponent } from './pages/prestacao-contas/prestacao-contas.component';
import { RegistraDebitoComponent } from './components/registra-debito-uniforme/registra-debito-uniforme.component';
import { ListaUniformeComponent } from './components/lista-uniforme/lista-uniforme.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { ListaDebitosComponent } from './components/lista-debitos/lista-debitos.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'evento/inscricao', component: InscricaoComponent },
    { path: 'evento', component: EventosComponent },
    { path: 'recebimento/relatorio', component: ListaPrestacaoContasComponent },
    { path: 'pagamento/registra', component: RegistraPagamentoComponent },
    { path: 'extrato/desbravador', component: ExtratoDesbravadorComponent },
    { path: 'pagamento/lista', component: ListaPagamentosComponent },
    { path: 'prestacao/contas', component: PrestacaoContasComponent },
    { path: 'uniforme', component: RegistraDebitoComponent },
    { path: 'uniforme/lista', component: ListaUniformeComponent },
    { path: 'pagamento', component: PagamentoComponent },
    {path: 'lista', component: ListaDebitosComponent},

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }

];
