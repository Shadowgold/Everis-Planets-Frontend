import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StarsService } from '../../services/stars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Star } from '../../interfaces/star';

@Component({
  selector: 'app-stars-admin',
  templateUrl: './stars-admin.component.html'
})
export class StarsAdminComponent implements OnInit {
  estrella: Star = {
    id: '0',
    name: 'Nombre de la Estrella',
    density: 'Ejemplo: 400'
  };
  new = false;
  idEstrella: string;
  resultadoOperacion = '';
  constructor(
    private starsService: StarsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(parametros => {
      this.idEstrella = parametros['id'];
      if (this.idEstrella != 'nuevo') {
        starsService
          .getEstrellaXDataBase(this.idEstrella)
          .subscribe(estrella => (this.estrella = estrella));
      } else {
        console.log('ES NUEVO');
      }
    });
  }

  ngOnInit() {}

  save() {
    if (this.idEstrella === 'nuevo') {
      console.log('nuevo');
      this.starsService.newEstrella(this.estrella).subscribe(
        data => {
          if (data && data.id) {
            this.resultadoOperacion = 'Operación finalizada con exito';
            this.router.navigate(['/admin', data.id]);
          } else {
            this.resultadoOperacion =
              'Error en la operación, verifique los datos';
          }
        },
        error => console.error(error)
      );
    } else {
      console.log(`Update ${this.idEstrella}`);
      this.starsService.updateEstrella(this.estrella).subscribe(
        data => {
          if (data && data.id) {
            this.resultadoOperacion = 'Operación finalizada con exito';
            console.log(data);
          } else {
            this.resultadoOperacion =
              'Error en la operación, verifique los datos';
          }
        },
        error => console.error(error)
      );
    }
  }
  addNew(formu: NgForm) {
    this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      pais: 'Espania'
    });
  }
}
