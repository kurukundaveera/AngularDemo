import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccSummaryComponent } from './acc-summary/acc-summary.component';
import { FundtransferComponent } from './fundtransfer/fundtransfer.component';
// import { AuthGuard } from './_guards';

const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'accsummary', component: AccSummaryComponent},
  {path: 'fundtransfer', component: FundtransferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
