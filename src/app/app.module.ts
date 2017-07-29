import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';

import {
  AppComponent,
  UserlistComponent,
  UserlistItemComponent,
  UserDetailsComponent,
  MessagebarComponent,
  MessageboardComponent,
  MessageComponent
} from './components';

import {
  UserService,
  FakeHttpService,
  ImgService,
  MessageService,
  StorageService
} from './services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent,
    UserlistComponent,
    UserlistItemComponent,
    UserDetailsComponent,
    MessagebarComponent,
    MessageboardComponent,
    MessageComponent
  ],
  providers: [
    UserService,
    FakeHttpService,
    ImgService,
    MessageService,
    StorageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {};
