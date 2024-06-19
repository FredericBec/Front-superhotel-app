import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  listCities : City[] | undefined;
  hotel : Hotel | undefined;
  hotelForm!: FormGroup;
  city : City | undefined;
  error : any;
  selectedPicture: File | null = null;

  constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) { 
    this.hotelForm = this.formBuilder.group({
      name : ['', [Validators.required]],
      address : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      star : [0, [Validators.required]],
      room : [0, [Validators.required]],
      price : [0, [Validators.required]],
      photo : [''],
      city : ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.apiService.getCities().subscribe({
      next : (data) => this.listCities = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    });
  }

  onSubmit(form : FormGroup){
    if(form.valid) this.apiService.addNewHotel(form.value).subscribe({
      next : (data) => this.changePicture(data.id),
      error : (err) => this.error = err.message,
      complete : () => this.router.navigateByUrl('hotels')
    });
    else this.error = "Veuillez remplir les champs";
	}

  changePicture(trainingId: number) 
	{
		if (this.selectedPicture) 
		{
			console.log(this.selectedPicture)
			const data = new FormData();
			data.append("file" , this.selectedPicture)
			this.apiService.changePicture(trainingId , data).subscribe({
				next : (response) => console.log(response),
				error : (error) => console.log("bad request upload imgs changePicture" , error)
      })
		}
	}

  onPictureSelect(event: any) 
	{
		this.selectedPicture = event.target.files[0];
	}

}
