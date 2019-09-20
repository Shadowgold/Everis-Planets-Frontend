import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Planet } from '../interfaces/planet';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class PlanetsService {


  public planets: Planet[] = [];
  public planet: Planet;

  
  planetListUrl = 'http://localhost:9000/api/v1/planets/';
  
  constructor(public http: HttpClient) {
  }

  public buscarPlanetasEnBaseDatosPost() {
    this.http
      .post(this.planetListUrl, null, {
        params: new HttpParams().set('servidor',
          'localhost').set('usuario', 'root')
      })
      .subscribe((planetsServer: Planet[]) => {
        this.planets = planetsServer;
      });
  }

  public buscarPlanetaBDGet() {
    this.http.get(this.planetListUrl).subscribe((planetsServer: any) => {
      this.planets = planetsServer;
    });
  }

  public getPlanetas() {
    return this.planets;
  }

  public getPlanetasXId(idx: string): Planet {
    for (let planet of this.planets) {
      if (planet.id == idx) {
        return planet;
      }
    }
  }

  public newPlaneta(planetaNueva: Planet) {
    return this.http.post<Planet>(this.planetListUrl, planetaNueva,
      httpOptions).pipe(map( res => res));

  }

  public updatePlaneta(planetaUpdate: Planet) {
    console.log(planetaUpdate);
    const planetListUrl = `${this.planetListUrl}${+planetaUpdate.id}`;
    return this.http.put<Planet>(planetListUrl, planetaUpdate,
      httpOptions).pipe(map( res => res));
  }

  public deletePlaneta(idplaneta: string) {
    const planetListUrl = `${this.planetListUrl}${+idplaneta}`;
    console.log(planetListUrl);
    return this.http.delete(planetListUrl, httpOptions).pipe(map( res => res));
  }


  public getPlanetaXDataBase(idx:string){
    return this.http.get(this.planetListUrl+idx).pipe(
    map( res => {
    let planeta:Planet = res as Planet;
    console.log(res);
    return planeta;
    }));
    }

  getPlanetasFromDataBase(){
    return this.http.get(this.planetListUrl).pipe(
    map( planetsServer => planetsServer));
    }







}
