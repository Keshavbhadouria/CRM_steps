import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page404Component } from './page404/page404.component';

const routes: Routes = [
    {
        path: 'contacts/profile',
        component: Page404Component
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExtrapagesRoutingModule { }
