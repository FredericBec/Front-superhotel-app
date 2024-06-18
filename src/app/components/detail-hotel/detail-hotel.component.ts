import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.css']
})
export class DetailHotelComponent implements OnInit {

  hotel : Hotel | undefined;
  urlHost : string = environment.host;
  starRating : number[] = [1,2,3,4,5];

  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if(hotelId) this.apiService.getHotel(+hotelId).subscribe(hotel => this.hotel = hotel);
  }

  onDisplayHotels(){
    this.router.navigateByUrl('hotels');
  }
}
