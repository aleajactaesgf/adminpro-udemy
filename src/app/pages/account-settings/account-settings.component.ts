import { Component, OnInit, Inject, ElementRef, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document,
                private renderer: Renderer2,
              public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: ElementRef ) {
    // console.log( link );
    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );
  }

  aplicarCheck( link: ElementRef ) {
  // CODIGO ALUMNOS
  const selectors = this._document.getElementsByClassName('selector');
   for (const ref of selectors) {
     /* CODIGO FERNANDO
     ref.classList.remove('working');*/
     this.renderer.removeClass( ref, 'working' );
   }
   this.renderer.addClass( link, 'working' );


  }

  colocarCheck() {
    const selectors = this._document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for (const ref of selectors) {
      if ( ref.getAttribute('data-theme') === tema ) {
        this.renderer.addClass( ref, 'working' );
        break;
      }
    }
  }

}
