import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../model/hotel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  public getHotels(){
    return this.http.get<Hotel[]>(environment.host + "/hotels");
  }

  public getHotelsByCity(id : number){
    return this.http.get<Hotel[]>(environment.host + "/hotels/city" + id);
  }

  public getHotel(id : number){
    return this.http.get<Hotel>(environment.host + "/hotels/" + id);
  }

  public addNewHotel(hotel : Hotel){
    return this.http.post<Hotel>(environment.host + "/hotels", hotel);
  }

  public updateHotel(id : number, hotel : Hotel){
    return this.http.post<Hotel>(environment.host + "/hotels/" + id, hotel);
  }

  public deleteHotel(id : number){
    return this.http.delete<Hotel>(environment.host + "/hotels/" + id);
  }
}
