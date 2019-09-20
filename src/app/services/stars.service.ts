import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Star } from '../interfaces/star';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class StarsService {


  public stars: Star[] = [];
  public star: Star;

  
  starListUrl = 'http://localhost:9000/api/v1/stars/';
  starListUrl1 = 'http://localhost:9000/api/v1/stars/1';
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
    return this.http.post<Star>(this.starListUrl, null, 
      {params: new HttpParams().set('name', estrellaNueva.name)
      .set('density',estrellaNueva.density)})
      .pipe(map(nuevaEstrella =>{
        console.log(nuevaEstrella.name);
        return nuevaEstrella;
      }));
  }

  public updateEstrella(estrellaUpdate: Star) {
    return this.http.put<Star>(this.starListUrl, null, 
      {params: new HttpParams().set('name', estrellaUpdate.name)
      .set('density',estrellaUpdate.density)})
      .pipe(map(updateEstrella =>{
        console.log(updateEstrella.name);
        return updateEstrella;
      }));
  }

  public deleteEstrella(idEstrella: string) {
    const starListUrl = `${this.starListUrl}/${1}`;
    return this.http.delete<Star>(this.starListUrl1, httpOptions).pipe(map( res => res));
  }

  deleteEstrella1(idEstrella: string){
    
    return this.http.delete( this.starListUrl,  {params: new
   HttpParams().set('id', idEstrella)})
    .pipe(
    map( res => {
    console.log(res);
    return res;
    }));
    }
   

  getEstrellassFromDataBase(){
    return this.http.get(this.starListUrl).pipe(
    map( starsServer => starsServer));
    }







}
