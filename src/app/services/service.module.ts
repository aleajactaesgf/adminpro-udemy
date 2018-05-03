import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard,
  SubirArchivoService,
  MedicoService
 } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
