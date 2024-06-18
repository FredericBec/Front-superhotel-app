import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels(){
    this.apiService.getHotels().subscribe({
      next : (data) => this.listHotels = data,
      error : (err) => this.error = err,
      complete : () => this.error = null
    });
  }

}
