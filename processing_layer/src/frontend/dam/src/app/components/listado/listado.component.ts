import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { Dispositivo } from '../../interfaces/dispositivo';
import { ListadoService } from '../../services/listado.service';
import { Device } from 'src/app/interfaces/device';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component_2.html',
  styleUrls: ['./listado.component.css'] ,
})
export class ListadoComponent {

  devices : Dispositivo[] = [];
  devices2 : Device[] = [];

  constructor( private listadoServ:ListadoService ) { 
    this.listadoServ.getDispositivos().subscribe(data => {
      console.log("recibiendo dispositivos");
      console.log(data);
      this.devices = data;
    });
    this.listadoServ.getDispositivos2().subscribe(data => {
      console.log("recibiendo dispositivos");
      console.log(data);
      this.devices2 = data;
    });
  }

  ngOnInit(): void {  }

  showReading(d:Dispositivo){
    console.log(Number(d.lastReadingValue));
    this.listadoServ.setRefresh(Number(d.lastReadingValue));
  }

  openValve(d:Dispositivo){
    this.listadoServ.createLogRiego(d , true);
    delay(1000);
    this.listadoServ.getDispositivos().subscribe(data => {
      console.log(data);
      this.devices = data;
    });
  }

  closeValve(d:Dispositivo){
    this.listadoServ.createLogRiego(d , false);
    this.listadoServ.createMedicion(d);
    this.listadoServ.getDispositivos().subscribe(data => {
      console.log(data);
      this.devices = data;
    });
  }
}
