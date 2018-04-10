import { Component, OnInit, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  // Inicializacion del plugin de Google
  googleInit() {
      gapi.load( 'auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '877893565770-lbcm4j9j926p22lgrn1a4oauib4r6423.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.attachSignin(document.getElementById('btnGoogle'));
      });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      // console.log(token);
      /* this._usuarioService.loginGoogle( token )
          .subscribe( correcto => window.location.href= '#/dashboard'); */
        // Ejecutamos dentro de una zona
        this.zone.run( () => {
          // console.log('ESTOY DENTRO DE UNA ZONA');
          this._usuarioService.loginGoogle( token )
              .subscribe( isLogado => this.router.navigate( [ '/dashboard' ] ) );
      } );
    });

  }

  ingresar( forma: NgForm) {

    if ( forma.invalid) {
       return;
    }

    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );
    this._usuarioService.login( usuario, forma.value.recuerdame)
            .subscribe( correcto => this.router.navigate([ '/dashboard' ]));
    // this.router.navigate([ '/dashboard' ]);
  }
}
