import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarpoolComponent } from '../carpool/components/carpool.component';
import { AutonuevoComponent } from './components/autonuevo/autonuevo.component'

const routes: Routes = [
    { path: '', component: CarpoolComponent },
    { path: 'autonuevo', component: AutonuevoComponent }
]
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);