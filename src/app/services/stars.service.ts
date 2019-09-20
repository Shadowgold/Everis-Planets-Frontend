import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Star } from '../interfaces/star';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class StarsService {


  public stars: Star[] = [];
  public star: Star;

  
  starListUrl = 'http://localhost:9000/api/v1/stars/';
  
  constructor(public http: HttpClient) {
  }

  public buscarEstrellasEnBaseDatosPost() {
    this.http
      .post(this.starListUrl, null, {
        params: new HttpParams().set('servidor',
          'localhost').set('usuario', 'root')
      })
      .subscribe((starsServer: Star[]) => {
        this.stars = starsServer;
      });
  }

  public buscarEstrellaBDGet() {
    this.http.get(this.starListUrl).subscribe((starsServer: any) => {
      this.stars = starsServer;
    });
  }

  public getEstrellas() {
    return this.stars;
  }

  public getEstrellasXId(idx: string): Star {
    for (let star of this.stars) {
      if (star.id == idx) {
        return star;
      }
    }
  }

  public newEstrella(estrellaNueva: Star) {
    return this.http.post<Star>(this.starListUrl, estrellaNueva,
      httpOptions).pipe(map( res => res));

  }

  public updateEstrella(estrellaUpdate: Star) {
    const starListUrl = `${this.starListUrl}${+estrellaUpdate.id}`;
    return this.http.put<Star>(starListUrl, estrellaUpdate,
      httpOptions).pipe(map( res => res));
  }

  public deleteEstrella(idEstrella: string) {
    const starListUrl = `${this.starListUrl}${+idEstrella}`;
    console.log(starListUrl);
    return this.http.delete(starListUrl, httpOptions).pipe(map( res => res));
  }


  public getEstrellaXDataBase(idx:string){
    return this.http.get(this.starListUrl+idx).pipe(
    map( res => {
    let equipo:Equipo = res as Equipo;
    console.log(res);
    return equipo;
    }));
    }

  getEstrellassFromDataBase(){
    return this.http.get(this.starListUrl).pipe(
    map( starsServer => starsServer));
    }







}
