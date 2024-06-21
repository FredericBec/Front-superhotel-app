import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel-manager',
  templateUrl: './hotel-manager.component.html',
  styleUrls: ['./hotel-manager.component.css']
})
export class HotelManagerComponent implements OnInit {

  listHotels : Hotel[] = [];
  managerForm!: FormGroup;
  isUpdateForm : boolean |undefined;
  error : any;

  constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm()
	{
		const urlSegments = this.router.url.split('/');
		const managerId = +urlSegments[urlSegments.length - 1];
		this.isUpdateForm = !isNaN(managerId);
		this.managerForm = this.formBuilder.group(
		{
			id : [managerId ? managerId : ''],
			name : ['', [Validators.required]],
			firstName : ['', Validators.required],
      hotel : ['']
		});
		if(this.isUpdateForm)
		{
			this.apiService.getHotelManagerById(managerId).subscribe((data) => 
			{
        this.apiService.getHotelsByHotelManager(managerId).subscribe({
          next : (data) => this.listHotels = data,
          error : (err) => this.error = err.message
        })
        if(this.managerForm)
					{
					this.managerForm.patchValue(
					{
						name : data.name,
            firstName : data.firstName,
            hotel : this.listHotels
					})
				}
			});
		}
	}

  onSubmit(form : FormGroup){
    if(form.valid){
      if(this.isUpdateForm) {
        this.apiService.updateHotelManager(form.value.id, form.value).subscribe({
          next : () => this.router.navigateByUrl('hotelManagers'),
          error : (err) => this.error = err.message
        });
      }
      else {
        this.apiService.addNewHotelManager(form.value).subscribe({
          next : () => this.router.navigateByUrl('hotelManagers'),
          error : (err) => this.error = err.message
        });
      }
    }
  }
}
