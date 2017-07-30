import { Routes } from '@angular/router';

import {
  UserDetailsComponent,
  MessageboardComponent,
  NoContentComponent
} from './components';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NoContentComponent
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent
  },
  {
    path: 'messageboard/:id',
    component: MessageboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];