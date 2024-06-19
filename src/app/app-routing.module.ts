import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailHotelComponent } from './components/detail-hotel/detail-hotel.component';
import { LoginoutComponent } from './components/loginout/loginout.component';

const routes: Routes = [
  {path : 'hotels', component : HotelsComponent},
  {path : 'hotels/:id', component : DetailHotelComponent},
  {path : 'login', component : LoginoutComponent},
  {path : '', redirectTo : 'hotels', pathMatch : 'full'},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
