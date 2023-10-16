import { Directive, ElementRef, HostListener } from '@angular/core';
import { ListadoService } from '../services/listado.service';

@Directive({
  selector: '[showReading]'
})
export class ShowReadingDirective {

  constructor(
    private el:ElementRef , 
    private listadoServ:ListadoService 
    ) { 
    el.nativeElement.style.backgroundColor='blue';
    
  }

  @HostListener('click') mouseClick(){
    var deviceId = Number(this.el.nativeElement.id);
    console.log("id de dispositivo a mostrar: " + deviceId);
    this.listadoServ.getLastReadingByDevice(deviceId).subscribe(data => {
      if(data.length > 0){

        var lastReading = Number(data[0].valor);
        console.log(lastReading);
        this.listadoServ.setRefresh(lastReading);
      }
    });
  }


}
