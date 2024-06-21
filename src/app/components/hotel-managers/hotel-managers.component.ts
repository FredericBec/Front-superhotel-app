import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelManager } from 'src/app/model/hotel-manager.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel-managers',
  templateUrl: './hotel-managers.component.html',
  styleUrls: ['./hotel-managers.component.css']
})
export class HotelManagersComponent implements OnInit {


  listHotelManagers : HotelManager[] | undefined;
  listHotels : Hotel[] | undefined;
  error : any;

  constructor(private apiService : ApiService, private router : Router) { }

  ngOnInit(): void {
    this.getAllHotelManagers();
  }

  getAllHotelManagers(){
    this.apiService.getHotelManagers().subscribe({
      next : (data) => this.listHotelManagers = data,
      error : (err) => this.error = err.message,
      complete : () => this.loadHotels()
    })
  }

  loadHotels(){
    this.apiService.getHotels().subscribe({
      next : (data) => this.listHotels = data,
      error : (err) => this.error = err,
      complete : () => this.error = null
    });
  }

  getHotelByHotelManager(hotelManagerId : number){
    return this.listHotels?.filter(hotel => hotel.hotelManager.id === hotelManagerId);
  }

  onDeleteHotelManager(id: number) {
    this.apiService.deleteHotelManager(id).subscribe({
      error : (err) => this.error = err.message,
      complete : () => this.getAllHotelManagers()
    })
  }

  onUpdateHotelManager(hotelManager: HotelManager) {
    this.router.navigate(['hotelManager', hotelManager.id]);
  }

  onDetailHotel(hotel : Hotel){
    this.router.navigate(['hotels', hotel.id]);
  }
}
