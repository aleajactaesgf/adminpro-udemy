import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  canActivate(): boolean {
    /* console.log( 'Pasó por el login Guard' );
    return this._usuarioService.estaLogueado(); */
    if ( this._usuarioService.estaLogueado()) {
      // console.log( 'Pasó el Guard');
      return true;
    } else {
      // console.log( 'Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
