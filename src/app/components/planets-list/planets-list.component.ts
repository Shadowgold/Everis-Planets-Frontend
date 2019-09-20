import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../../services/planets.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css']
})
export class PlanetsListComponent implements OnInit {

  constructor(private _planetsService : PlanetsService) { }

  ngOnInit() {
  }

}
