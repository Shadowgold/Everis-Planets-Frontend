import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../../services/planets.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Planet } from '../../interfaces/planet';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html'
})
export class PlanetsListComponent implements OnInit {
  planets: any[] = [];

  constructor(
    private planetsService: PlanetsService,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.planetsService.getPlanetasFromDataBase()
    .subscribe(data => {
      console.log(data);
      for (let eq in data) {
        console.log(data[eq]);
        this.planets.push(data[eq]);
      }
    });
  }


  delete(idPlaneta:string){
    var opcion = confirm("Esta seguro que desea eliminar el planeta?");
    if (opcion == true) {
    this.planetsService.deletePlaneta(idPlaneta)
    .subscribe(data => {
    console.log(data);
    location.reload();
    });
  }
}
}

