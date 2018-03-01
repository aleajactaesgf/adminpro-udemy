import { Injectable, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    // console.log('Guardado en el localStorage');
    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes =  JSON.parse( localStorage.getItem('ajustes') );
      // console.log('Cargando del localStorage');

      // this.aplicarTema( this.ajustes.tema );

    } else {
      console.log('Usando Valores por defecto');
    }
  }
  aplicarTema( tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    // CODIGO FERNANDO
    this._document.getElementById('tema').setAttribute('href', url);

    // CODIGO ALUMNOS
    // this.renderer.setAttribute(document.getElementById('tema'), 'href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
