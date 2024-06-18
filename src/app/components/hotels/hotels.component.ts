import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  listHotels : Hotel[] = [];
  listCities : City[] = [];
  error : any;
  starRating : number[] = [1,2,3,4,5];
  urlHost : string = environment.host;

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.getAllHotels();
    this.getAllCities();
  }

  getAllHotels(){
    this.apiService.getHotels().subscribe({
      next : (data) => this.listHotels = data,
      error : (err) => this.error = err,
      complete : () => this.error = null
    });
  }

  getAllCities(){
    this.apiService.getCities().subscribe({
      next : (data) => this.listCities = data,
      error : (err) => this.error = err,
      complete : () => this.error = null
    })
  }

  getAllHotelsByCity(city : City){
    this.apiService.getHotelsByCity(city.id).subscribe({
      next : (data) => this.listHotels = data,
      error : (err) => this.error = err,
      complete : () => this.error = null
    })
  }

}
