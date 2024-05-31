import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SuccessComponent } from './components/success/success.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
    {
        path: 'auth', component: AuthComponent
    },
    {
        path: 'auth/success', component: SuccessComponent
    },
    {
        path: 'auth/login', component: LoginComponent
    },
    {
        path: 'auth/confirm', component: ConfirmComponent
    },
    {
        path: 'logout', component: LogoutComponent
    },
    {
        path: '', redirectTo: 'auth', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }