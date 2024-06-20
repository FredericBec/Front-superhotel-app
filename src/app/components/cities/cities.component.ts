import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  listCities : City[] | undefined;
  hotels : Hotel[] | undefined;
  error : any;

  constructor(private apiService : ApiService, private router : Router) { }

  ngOnInit(): void {
    this.apiService.getCities().subscribe({
      next : (data) => this.listCities = data,
      error : (err) => this.error = err.message,
      complete : () => this.loadHotels()
    });
  }

  loadHotels(){
    this.apiService.getHotels().subscribe({
      next : (data) => this.hotels = data,
      error : (err) => this.error = err.message
    })
  }

  getHotelByCity(cityId : number){
    return this.hotels?.filter(hotel => hotel.city.id === cityId);
  }

  onDeleteCity(id : number){
    if(confirm("Voulez vous vraiment supprimer la ville d'" + id + " ?")){
      this.apiService.deleteCity(id).subscribe({
        next : () => this.router.navigateByUrl('cities'),
        error : (err) => this.error = err.message
      });
    }
  }

  onUpdateCity(city : City){
    this.router.navigate(['city', city.id]);
  }

}
