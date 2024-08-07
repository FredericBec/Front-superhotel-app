import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService
      ]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should return all hotel with keyword', (done: DoneFn) => {
    const expectedHotels = [
      {id: 3, name: "Great hostel", address: "china town", phone: "5698222", star: 2, room: 300, price: 500, photo: "", city: {id: 2, name: "New-york"}, hotelManager: {id: 1, name: "El bab", firstName: "Momo"}},
      {id: 4, name: "Palm hotel", address: "wall street NY256", phone: "6987452", star: 2, room: 500, price: 300, photo: "", city: {id: 2, name: "New-york"}, hotelManager: {id: 1, name: "El bab", firstName: "Momo"}}
    ];
    const cityKeyword = 'yor';

    service.getHotelsByKeyword(cityKeyword).subscribe(hotels => {
      expect(hotels.length).toBe(2);
      expect(hotels).toEqual(expectedHotels)
      expect(hotels.includes({id: 4, name: "Palm hotel", address: "wall street NY256", phone: "6987452", star: 2, room: 500, price: 300, photo: "", city: {id: 2, name: "New-york"}, hotelManager: {id: 1, name: "El bab", firstName: "Momo"}}))
      done();
    })

    const req = httpTestingController.expectOne(environment.host + "/hotels/?keyword=" + cityKeyword);

    req.flush(expectedHotels);
  });

  it('should return a 404 error with bad id', (done: DoneFn) => {
    const hotelId = 23;
    const testUrl = environment.host + "/hotels/" + hotelId;
    const emsg = 'Id de l\'hôtel 23 n\'existe pas';

    service.getHotel(hotelId).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        done();
      }
    })
    
    const req = httpTestingController.expectOne(testUrl);

    req.flush(emsg, {status: 404, statusText: 'Not found'});
  })
});
