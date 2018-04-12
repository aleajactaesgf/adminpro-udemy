import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuarios'): any {

    const url = URL_SERVICIOS + '/img';

    if ( img === undefined ) {
      return url + '/usuarios/xxxx'; // Para que nos devuelve la imagen no existente
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    return `${url}/${tipo}/${img}`;
  }

}
