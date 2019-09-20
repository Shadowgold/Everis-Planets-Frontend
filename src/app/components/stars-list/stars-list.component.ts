import { Component, OnInit } from '@angular/core';
import { StarsService } from '../../services/stars.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Star } from '../../interfaces/star';

@Component({
  selector: 'app-stars-list',
  templateUrl: './stars-list.component.html'
})
export class StarsListComponent implements OnInit {
  stars: any[] = [];

  constructor(
    private starsService: StarsService,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.starsService.getEstrellassFromDataBase()
    .subscribe(data => {
      console.log(data);
      for (let eq in data) {
        console.log(data[eq]);
        this.stars.push(data[eq]);
      }
    });
  }


  delete(idEstrella:string){
    var opcion = confirm("Esta seguro que desea eliminar la estrella?");
    if (opcion == true) {
    this.starsService.deleteEstrella(idEstrella)
    .subscribe(data => {
    console.log(data);
    location.reload();
    });
  }
}
}
