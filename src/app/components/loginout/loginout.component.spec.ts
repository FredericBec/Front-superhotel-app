import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginoutComponent } from './loginout.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginoutComponent', () => {
  let component: LoginoutComponent;
  let fixture: ComponentFixture<LoginoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginoutComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
