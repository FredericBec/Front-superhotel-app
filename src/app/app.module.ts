import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailHotelComponent } from './components/detail-hotel/detail-hotel.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { UnauthorizeAccessComponent } from './components/error/unauthorize-access/unauthorize-access.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityComponent } from './components/city/city.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { HotelManagersComponent } from './components/hotel-managers/hotel-managers.component';
import { HotelManagerComponent } from './components/hotel-manager/hotel-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    PageNotFoundComponent,
    DetailHotelComponent,
    LoginoutComponent,
    UnauthorizeAccessComponent,
    HotelComponent,
    CitiesComponent,
    CityComponent,
    HotelManagersComponent,
    HotelManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : JwtInterceptorInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
