import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { HotelsComponent } from './hotels.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { City } from 'src/app/model/city.model';
import { ApiService } from 'src/app/services/api.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HotelsComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsComponent);
    component = fixture.componentInstance;
    component.listCities = [
      {id: 1, name: 'Toulouse'},
      {id: 2, name: 'New-York'}
    ]
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call #getAllHotelsByCity when click on link', fakeAsync(() => {
    spyOn(component, 'getAllHotelsByCity');
    let cityButton: DebugElement[] = fixture.debugElement.queryAll(By.css('.nav-item .nav-link'));
    cityButton[1].nativeElement.click();

    tick();
    expect(component.getAllHotelsByCity).toHaveBeenCalled();
  }));
});
