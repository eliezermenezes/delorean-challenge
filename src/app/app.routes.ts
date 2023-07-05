import { Routes } from '@angular/router';

import { UsersComponent } from './users/containers/users/users.component';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
    },
    {
        path: 'users',
        component: UsersComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];
