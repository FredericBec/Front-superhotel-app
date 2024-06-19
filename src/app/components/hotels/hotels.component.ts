import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
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
  collapseState : {[key : number] : boolean} = {};
  selectedFile: File | null = null;
	selectedIdHotel : number| null = null;

  constructor(private apiService : ApiService, private router : Router, public authService : AuthService) { }

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

  onHotelDetail(hotel : Hotel){
    this.router.navigate(['/hotels', hotel.id]);
  }

  onDeleteHotel(id : number){
    if(confirm('Voulez-vous supprimer l\'hotel ' + id + ' ?')){
      this.apiService.deleteHotel(id).subscribe();
    }
  }

  onUpdateHotel(hotel : Hotel){
    this.router.navigate(['/hotels', hotel.id]);
  }

  onFileSelected(event: any , eventIdHotel : number) 
	{
		this.selectedFile = event.target.files[0];
		this.selectedIdHotel = eventIdHotel
	}

	changePicture(hotelId: number) 
	{
		if (this.selectedFile) 
		{
			const data = new FormData();
			data.append("file" , this.selectedFile)
			this.apiService.changePicture(hotelId , data).subscribe();
		}
	}

	annulePicture()
	{
		this.selectedFile = null
		this.selectedIdHotel = null
		
	}

  isOpen(id : number){
		this.collapseState[id] = !this.collapseState[id];
	}

	isCollapse(id : number){
		return this.collapseState[id];
	}

}
