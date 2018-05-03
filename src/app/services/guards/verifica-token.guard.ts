import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivateChild {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivateChild(): Promise<boolean> | boolean {

    // console.log('Inicio VerificaTokenGuard');

    const token = this._usuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ));

    const expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject ) => {

      const tokenExp = new Date( fechaExp * 1000 );
      const ahora = new Date();

      // Quiero aumentar el token en 4 horas
      ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000 ));

      /* console.log( tokenExp );
      console.log( ahora ); */

      if ( tokenExp.getTime() > ahora.getTime() ) { // Quedan mas de 4 horas para que expire
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
              .subscribe( () => {
                resolve(true);
              }, () => {
                this.router.navigate(['/login']);
                reject(false);
              });
      }



    });

  }

  expirado( fechaExp: number ) {

    const ahora = new Date().getTime() / 1000; // Fecha actual en segundos

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }

  }
}
