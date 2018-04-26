import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales());
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital( termino)
          .subscribe( hospitales => this.hospitales = hospitales);

  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        });
  }


  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
        .subscribe();

  }
  borrarHospital( hospital: Hospital) {

    Swal({
      title: 'Validación',
      text: 'Está seguro de eliminar ' + hospital.nombre + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
         this._hospitalService.borrarHospital( hospital._id )
           .subscribe( () => this.cargarHospitales());

      }
    });

  }

  crearHospital() {

    Swal({
      title: 'Crear Hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.crearHospital(result.value)
              .subscribe( () => {
                this.cargarHospitales();
              });
      }
    });
  }

  actualizarImagen( hospital: Hospital) {

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

}
