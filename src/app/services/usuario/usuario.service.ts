import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    // console.log('Servicio de Usuario Listo');
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token} )
          .map( (resp: any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario);
            return true;
          });
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
        localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario)
            .map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario);
                return true;
            });

  }

  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario)
        .map( (resp: any) => {
          Swal('Usuario Creado', usuario.email, 'success');
          return resp.usuario;
        });
  }

}
