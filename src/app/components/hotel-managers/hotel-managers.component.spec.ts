import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelManagersComponent } from './hotel-managers.component';

describe('HotelManagersComponent', () => {
  let component: HotelManagersComponent;
  let fixture: ComponentFixture<HotelManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelManagersComponent ]
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
