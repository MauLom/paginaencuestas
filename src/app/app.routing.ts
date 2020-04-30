import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes


const appRoutes: Routes = [
    
    { path: 'carpool', loadChildren: './modules/carpool/carpool.module#CarpoolModule' },
    { path: '', redirectTo: 'carpool', pathMatch: 'full' },
    { path: '**', redirectTo: 'carpool', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });