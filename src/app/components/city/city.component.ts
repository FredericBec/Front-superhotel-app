import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city.model';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  listHotels : Hotel[] |undefined;
  city : City | undefined;
  isUpdateForm : boolean |undefined;
  cityForm!: FormGroup;
  error : any;

  constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm()
	{
		const urlSegments = this.router.url.split('/');
		const cityId = +urlSegments[urlSegments.length - 1];
		this.isUpdateForm = !isNaN(cityId);
		this.cityForm = this.formBuilder.group(
		{
			id : [cityId ? cityId : ''],
			name : ['', [Validators.required]],
			hotel : [''],
		});
		if(this.isUpdateForm)
		{
			this.apiService.getCityById(cityId).subscribe((data) => 
			{
        if(this.cityForm)
					{
					this.cityForm.patchValue(
					{
						name : data.name
					})
				}
			});
		}
	}

  onSubmit(form : FormGroup){
    if(form.valid){
      if(this.isUpdateForm) {
        this.apiService.updateCity(form.value.id, form.value).subscribe({
          next : () => this.router.navigateByUrl('cities'),
          error : (err) => this.error = err.message
        });
      }
      else {
        this.apiService.addNewCity(form.value).subscribe({
          next : () => this.router.navigateByUrl('cities'),
          error : (err) => this.error = err.message
        });
      }
    }
  }

}
