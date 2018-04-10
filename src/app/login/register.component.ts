import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string) {

    return ( group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null; // Con el null indicamos que pasamos la validación, en caso contrario se envía algo
      }
        return {
          sonIguales: true
        };
    };

  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
        nombre: new FormControl( null, Validators.required), // Valor por defecto null
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl( null, Validators.required),
        password2: new FormControl( null, Validators.required),
        condiciones: new FormControl( false) // Valor por defecto false
    }, { validators: this.sonIguales( 'password', 'password2') });

  // Para no estar rellenando el form
  this.forma.setValue({
    nombre: 'test 1',
    correo: 'test1@test1.com',
    password: '123456',
    password2: '123456',
    condiciones: true
  });

  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      Swal  ('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this._usuarioService.crearUsuario(usuario)
            .subscribe( resp => this.router.navigate(['/login'])); // Si responde es que todo fue bien

  }

}
