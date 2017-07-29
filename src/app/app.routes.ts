import { Routes } from '@angular/router';

import {
  UserDetailsComponent,
  MessageboardComponent
} from './components';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user/:id',
        component: UserDetailsComponent
      },
      {
        path: 'messageboard/:id',
        component: MessageboardComponent
      }
    ]
  }
];