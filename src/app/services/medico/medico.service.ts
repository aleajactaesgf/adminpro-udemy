import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
        .map( (resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        });
  }

  cargarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
        .map( (resp: any) => resp.medico );
  }

  buscarMedicos( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url )
            .map( (resp: any) => {
              this.totalMedicos = resp.medicos.length;
              return resp.medicos;
            });

  }

  borrarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
          .map( resp => {
            Swal({
              type: 'info',
              title: 'Borrado',
              text: 'El medico ha sido borrado',
              showConfirmButton: false,
              timer: 1500
              });
              return true;
          });
  }

  guardarMedico( medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    // Validar si es alta o actualizción basando que existe el id del medico

    if ( medico._id ) {
      // Actualizacion
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico)
              .map( (resp: any) => {
                Swal({
                  type: 'info',
                  title: 'Médico Actualizado',
                  text: medico.nombre,
                  showConfirmButton: false,
                  timer: 1500
                  });
                  return resp.medico;
              });

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url , medico)
              .map( (resp: any) => {
                Swal({
                  type: 'info',
                  title: 'Médico Creado',
                  text: medico.nombre,
                  showConfirmButton: false,
                  timer: 1500
                  });
                  return resp.medico;
              });

    }
  }
}
