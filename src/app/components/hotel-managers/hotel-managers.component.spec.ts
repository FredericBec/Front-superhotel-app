import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelManagersComponent } from './hotel-managers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HotelManagersComponent', () => {
  let component: HotelManagersComponent;
  let fixture: ComponentFixture<HotelManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelManagersComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
