import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlanetsService } from '../../services/planets.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Planet } from '../../interfaces/planet';
import { StarsService } from '../../services/stars.service';

declare let bootstrapValidate: any;
@Component({
  selector: 'app-planets-admin',
  templateUrl: './planets-admin.component.html'
})
export class PlanetsAdminComponent implements OnInit {
  planeta: Planet = {
    id: '',
    name: '',
    size: '',
    star: {
      id: "",
      name: "",
      density: "",
    }
 };
  new = false;
  idPlaneta: string;
  resultadoOperacion = '';
  stars: any[] = [];
  
  constructor(
    private planetsService: PlanetsService,
    private starsService: StarsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(parametros => {
      this.idPlaneta = parametros['id'];
      if (this.idPlaneta != 'nuevo') {
        planetsService
          .getPlanetaXDataBase(this.idPlaneta)
          .subscribe(planeta => (this.planeta = planeta));
      } else {
        console.log('ES NUEVO');
      }
    });
  }

  ngOnInit() {
    this.starsService.getEstrellassFromDataBase()
    .subscribe(data => {
      console.log(data);
      for (let eq in data) {
        console.log(data[eq]);
        this.stars.push(data[eq]);
      }
    });
    bootstrapValidate('#tamaño', 'integer:Ingrese un Entero por favor'),
    bootstrapValidate('#nombre', 'alphanum:El nombre debe ser alfanumérico');
  }

  save() {
    if (this.idPlaneta === 'nuevo') {
      console.log('nuevo');
      this.planetsService.newPlaneta(this.planeta).subscribe(
        data => {
          if (data && data.id) {
            this.resultadoOperacion = 'Operación finalizada con exito';
            this.router.navigate(['/planetlist']);
          } else {
            this.resultadoOperacion =
              'Error en la operación, verifique los datos';
          }
        },
        error => console.error(error)
      );
    } else {
      console.log(`Update ${this.idPlaneta}`);
      this.planetsService.updatePlaneta(this.planeta).subscribe(
        data => {
          if (data && data.id) {
            this.resultadoOperacion = 'Operación finalizada con exito';
            console.log(data);
            this.router.navigate(['/planetlist']);
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

