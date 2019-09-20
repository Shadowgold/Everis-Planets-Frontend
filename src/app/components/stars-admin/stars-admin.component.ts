import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StarsService } from '../../services/stars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Star } from '../../interfaces/star';
declare let bootstrapValidate: any;
@Component({
  selector: 'app-stars-admin',
  templateUrl: './stars-admin.component.html'
})
export class StarsAdminComponent implements OnInit {
  estrella: Star = {
    id: '',
    name: '',
    density: ''
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

  ngOnInit() {
    //bootstrapValidate('#name', 'alphanum:El nombre de la estrella debe ser Alfanumérico');
    bootstrapValidate('#densidad', 'integer:Ingrese un Entero por favor'),
    bootstrapValidate('#nombre', 'alphanum:El nombre debe ser alfanumérico');
  }

  save() {
    if (this.idEstrella === 'nuevo') {
      console.log('nuevo');
      this.starsService.newEstrella(this.estrella).subscribe(
        data => {
          if (data && data.id) {
            this.resultadoOperacion = 'Operación finalizada con exito';
            this.router.navigate(['/starlist']);
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
            this.router.navigate(['/starlist']);
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
    this.router.navigate(['/starsadmin', 'nuevo']);
    formu.reset({
      
    });
  }

  
}
