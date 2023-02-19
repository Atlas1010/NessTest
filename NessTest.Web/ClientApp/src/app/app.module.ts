import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ModalDialogService, ModalDialogModule, UtilitiesService, LoaderService, LoaderModule } from 'ness-framework-client';

import { AppComponent } from './app.component';
import { Header } from "./components/shared/header.component";
import { UserListComponent } from "./components/userList.component";
import { UserUpdateComponent } from "./components/userUpdate.component";
import { LoaderComponent } from './components/loader/loader.component';
import { ModalDialogComponent } from './components/shared/message-dialog/modal-dialog.component';
import { ModalDialogService } from './services/shared/modal-dialog.service';
import { UtilitiesService } from './services/shared/utilities.service';
import { LoaderService } from './services/shared/loader/loader.service';
import { HttpConfigInterceptor } from './services/shared/loader/httpconfig.interceptor';

const routes: Routes = [
  { path: "UserList", component: UserListComponent },
  { path: "UserUpdate", component: UserUpdateComponent },
  { path: "UserUpdate/:id", component: UserUpdateComponent },
  {
    path: '',
    redirectTo: '/UserList',
    pathMatch: 'full'
  }
  ]

@NgModule({
  declarations: [
    AppComponent,
    Header,
    LoaderComponent,
    ModalDialogComponent,
    UserListComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule, BrowserModule, RouterModule.forRoot(routes, { useHash: true }), ReactiveFormsModule, FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }, ModalDialogService, UtilitiesService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
