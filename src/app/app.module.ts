import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';

import {
  AppComponent,
  UserlistComponent,
  UserlistItemComponent,
  UserDetailsComponent,
  MessagebarComponent,
  MessageboardComponent,
  MessageComponent,
  UserDetailsSpinnerComponent,
  NoContentComponent
} from './components';

import {
  UserService,
  FakeHttpService,
  ImgService,
  MessageService,
  StorageService,
  ViewStateService,
  SelectedUseridService
} from './services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    UserlistComponent,
    UserlistItemComponent,
    UserDetailsComponent,
    MessagebarComponent,
    MessageboardComponent,
    MessageComponent,
    UserDetailsSpinnerComponent,
    NoContentComponent
  ],
  providers: [
    UserService,
    FakeHttpService,
    ImgService,
    MessageService,
    StorageService,
    ViewStateService,
    SelectedUseridService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {};
