import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailHotelComponent } from './components/detail-hotel/detail-hotel.component';
import { LoginoutComponent } from './components/loginout/loginout.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { AdminGuard } from './guards/admin.guard';
import { UnauthorizeAccessComponent } from './components/error/unauthorize-access/unauthorize-access.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityComponent } from './components/city/city.component';

const routes: Routes = [
  {path : 'hotels', component : HotelsComponent},
  {path : 'hotels/:id', component : DetailHotelComponent},
  {path : 'hotel', component : HotelComponent, canActivate : [AdminGuard]},
  {path : 'cities', component : CitiesComponent, canActivate : [AdminGuard]},
  {path : 'city', component : CityComponent, canActivate : [AdminGuard]},
  {path : 'city/:id', component : CityComponent, canActivate : [AdminGuard]},
  {path : 'login', component : LoginoutComponent},
  {path : '', redirectTo : 'hotels', pathMatch : 'full'},
  {path : '403', component : UnauthorizeAccessComponent},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
