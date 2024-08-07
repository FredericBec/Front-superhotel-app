import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelManagerComponent } from './hotel-manager.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HotelManagerComponent', () => {
  let component: HotelManagerComponent;
  let fixture: ComponentFixture<HotelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelManagerComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
