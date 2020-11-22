import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentconfirmComponent } from './agentpos/agentconfirm.component';
import { AgentkycComponent } from './agentpos/agentkyc.component';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const agentposModule = () => import('./agentpos/agentpos.module').then(x => x.AgentposModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'agentpos',loadChildren : agentposModule }, 
    { path: 'agentkyc',component : AgentkycComponent },
    { path: 'agentconfirm',component : AgentconfirmComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }