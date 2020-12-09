import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgenterrorComponent } from './agentpos/agent-error.component';

import { AgentconfirmComponent } from './agentpos/agentconfirm.component';
import { AgentkycComponent } from './agentpos/agentkyc.component';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

//const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const agentposModule = () => import('./agentpos/agentpos.module').then(x => x.AgentposModule);
const agentModule = () => import('./agent/agent.module').then(x => x.AgentModule);
const motorModule = () => import('./motor/motor.module').then(x => x.MotorModule);

const routes: Routes = [
    { path: '', component: HomeComponent},
   // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
   // { path: 'account', loadChildren: accountModule },
    { path: 'agentpos',loadChildren : agentposModule }, 
    { path: 'agentkyc',component : AgentkycComponent },
    { path: 'agentconfirm',component : AgentconfirmComponent },
    { path: 'agent-process-error' , component : AgenterrorComponent},
    { path: 'agent', loadChildren : agentModule },
    { path: 'motor-insurance', loadChildren : motorModule },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }