import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', new Usuario('', '', ''), new Hospital(''), '');
  hospital: Hospital = new Hospital(''); // Solo el nombrer del hospital es obligatorio definido en el modelo.

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public _activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    _activatedRoute.params.subscribe( params => {
        const id =  params['id'];

        if ( id !== 'nuevo') {
          this.cargarMedico( id );
        }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.medico.img = resp.medico.img;
          });
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id)
          .subscribe( medico => {
            this.medico = medico;
            this.hospital = medico.hospital;
          });

  }

  guardarMedico( f: NgForm) {
      if ( f.valid) {
          this._medicoService.guardarMedico( this.medico )
              .subscribe( medico => {
                /* console.log(medico);
                this.medico = medico;
                this.hospital = medico.hospital; */
                this.cargarMedico( medico._id );
                this.router.navigate(['/medico', medico._id]);
              });
      }
  }

  cambioHospital( id: string ) {

    if ( id !== '') {
      this._hospitalService.obtenerHospital( id )
            .subscribe( hospital => this.hospital = hospital );
    } else {
        this.hospital = new Hospital('');
    }
  }
  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
