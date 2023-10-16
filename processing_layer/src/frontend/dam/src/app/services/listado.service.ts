import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dispositivo } from '../interfaces/dispositivo';
import { Medicion } from '../interfaces/medicion';
import { Device } from '../interfaces/device';

@Injectable(
  {
  providedIn: 'root'
})
export class ListadoService {

  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  
  private refresh: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    public httpClient:HttpClient
  ) {   }

  public getRefresh(): Observable<number> {
    return this.refresh.asObservable();
  }
  
  public setRefresh(value: number): void {
      this.refresh.next(value);
  } 
  getDispositivos2():  Observable<Device[]> {
    return this.httpClient.get<Device[]>('http://localhost:8000/api/devices3' );
 }

  getDispositivos():  Observable<Dispositivo[]> {
     return this.httpClient.get<Dispositivo[]>('http://localhost:8000/api/devices' );
  }

  createLogRiego( d:Dispositivo , apertura:boolean){

    var currentDate = new Date();
    var formatedDate = currentDate.toJSON().slice(0, 19).replace('T', ' ');

    var param = {apertura: Number(apertura)  , electrovalvulaId: d.valveId , fecha: formatedDate};

    this.httpClient.post('http://localhost:8000/api/riegos' , param , {headers: this.corsHeaders}).subscribe({
      error: (err) => { console.error(err) }
    });
  }

  getLastReadingByDevice(deviceId : number) : Observable<Medicion[]>{
    return this.httpClient.get<Medicion[]>('http://localhost:8000/api/mediciones/last/' + deviceId );
  }

  createMedicion(d:Dispositivo){
    var currentDate = new Date();
    var formatedDate = currentDate.toJSON().slice(0, 19).replace('T', ' ');

    var param = {
      dispositivoId: d.id , fecha: formatedDate , valor: d.lastReadingValue
    }

    this.httpClient.post('http://localhost:8000/api/mediciones' , param , {headers: this.corsHeaders}).subscribe({
      error: (err) => { console.error(err) }
    });;

  }

}
