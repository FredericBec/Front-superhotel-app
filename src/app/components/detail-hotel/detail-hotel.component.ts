import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { HotelManager } from 'src/app/model/hotel-manager.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.css']
})
export class DetailHotelComponent implements OnInit {

  hotel : Hotel | undefined;
  listCities : City[] | undefined;
  listHotelManager : HotelManager[] | undefined;
  city : City | undefined;
  urlHost : string = environment.host;
  starRating : number[] = [1,2,3,4,5];
  hotelForm!: FormGroup;
  error : any;
  selectedPicture : File | undefined;

  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router, public authService : AuthService, private formBuilder : FormBuilder) { 
    
  }

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if(hotelId) this.apiService.getHotel(+hotelId).subscribe({
      next : (hotel) => {
        this.hotel = hotel;
        this.initForm();
      },
      error : (err) => this.error = err.message
    });
    
    this.apiService.getCities().subscribe({
      next : (data) => {
        this.listCities = data,
        this.getCity()
      },
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    });

    this.apiService.getHotelManagers().subscribe({
      next : (data) => {
        this.listHotelManager = data,
        this.getHotelManager()
      },
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

  onDisplayHotels(){
    this.router.navigateByUrl('hotels');
  }

  initForm(){
    if(this.hotel){
      this.hotelForm = this.formBuilder.group({
        id : [this.hotel.id],
        name : [this.hotel?.name, [Validators.required]],
        address : [this.hotel?.address, [Validators.required]],
        phone : [this.hotel?.phone, [Validators.required]],
        star : [this.hotel?.star, [Validators.required]],
        room : [this.hotel?.room, [Validators.required]],
        price : [this.hotel?.price, [Validators.required]],
        photo : [null],
        city : [null, [Validators.required]],
        manager : [null, [Validators.required]]
      })
    }
  }

  getCity(){
    if(this.hotel && this.listCities){
      const hotelCity = this.listCities.find(city => city.id === this.hotel?.city.id);
      if(hotelCity) this.hotelForm.patchValue({city : hotelCity})
    }
  }

  getHotelManager(){
    if(this.hotel && this.listHotelManager){
      const hotelManager = this.listHotelManager.find(manager => manager.id === this.hotel?.hotelManager.id);
      if(hotelManager) this.hotelForm.patchValue({manager : hotelManager})
    }
  }

  onSubmit(form : FormGroup){
    if(form.valid){
      this.apiService.updateHotel(form.value.id, form.value).subscribe({
        next : () => {
          this.changePicture(form.value.id);
        },
        error : (err) => this.error = err.message,
        complete : () => this.router.navigateByUrl('hotels')
      });
    }
  }

  onPictureSelect(event: any) 
	{
		this.selectedPicture = event.target.files[0];
	}

	changePicture(hotelId: number) 
	{
		if (this.selectedPicture) 
		{
			console.log(this.selectedPicture)
			const data = new FormData();
			data.append("file" , this.selectedPicture)
			this.apiService.changePicture(hotelId , data).subscribe({
          next : (response) => console.log(response),
          error : (error) => console.log("bad request upload imgs changePicture" , error)
        }
			)
		}
	}
}
