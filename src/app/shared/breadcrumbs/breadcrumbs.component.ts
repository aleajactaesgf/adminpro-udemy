import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
        private router: Router,
        public title: Title,
        public meta: Meta) {

    this.getDataRoute()
      .subscribe( data => {
          this.label = data.titulo;
          this.title.setTitle( this.label );

          const metaTag: MetaDefinition = {
            name: 'description',
            content: this.label
          };
          this.meta.updateTag( metaTag );
      });

  }

  getDataRoute() {
    return this.router.events
      .filter( evento => evento instanceof ActivationEnd ) // Filtramos los eventos que nos interesan
      .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ) // Filtramos los eventos que nos interesan
      .map( (evento: ActivationEnd) => evento.snapshot.data );
  }

  ngOnInit() {
  }

}
