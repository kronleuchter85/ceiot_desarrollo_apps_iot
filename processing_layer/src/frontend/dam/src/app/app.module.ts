import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListadoComponent } from './components/listado/listado.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { ShowReadingDirective } from './directives/show-reading.directive';
import { FormsModule } from '@angular/forms';
import { DetalleSensorComponent } from './components/detalle-sensor/detalle-sensor.component';

@NgModule({
  declarations: [AppComponent ,ListadoComponent
    , DetalleSensorComponent
     , FormatDatePipe , ShowReadingDirective
  ],
  imports: [BrowserModule, IonicModule.forRoot()
    , AppRoutingModule
    , HttpClientModule 
    , FormsModule
    , HttpClientModule 
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }],
  bootstrap: [AppComponent],
  exports: [ListadoComponent,DetalleSensorComponent],
  
})
export class AppModule {}
