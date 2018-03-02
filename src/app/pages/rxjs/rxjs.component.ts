import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscrition: Subscription;

  constructor() {

    this.subscrition = this.regresaObservable()
      // .retry(2)// Reintenta dos veces, sin el parametro seria infinito, mas limpio en la function
        .subscribe(
          number => console.log('Subs ', number), // Cuando recibo del next
          error => console.error( 'Error en el observer (dos veces) ', error), // Cuando se produce un error
          () => console.log('Complete') // Cuando se ejecuta el complete No recibe parametros
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {

    console.log('La página se va a cerrar');
    this.subscrition.unsubscribe();
  }

  regresaObservable(): Observable<any>  {

    return new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;
        const salida = {
          valor: contador
        };

        // observer.next( contador );
        observer.next( salida );

        /* if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        } */

        /* if ( contador === 2 ) {
         // clearInterval( intervalo ); // Se limpia el interval tambien en el error para que no se ejecute más
          observer.error( 'Se produjo un error' );

        } */

      }, 500);
    }).retry(2) // El retry queda más limpio y controlado aquí
    .map( ( resp: any ) => { // Tratamiento de los datos antes solo se ejecuta subscrito al observer
          return resp.valor;
    })
    .filter( (valor, index) => { // Filtrado de datos
      // console.log('Filter', valor, index);
      let resultado = true;
      if ( valor % 2 === 0 ) {
        resultado = false;
      }
      return resultado;
    });

  }
}
