import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
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
      next : (data) => this.listCities = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    });
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
        photo : [''],
        city : [this.hotel?.city, [Validators.required]],
      })
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
