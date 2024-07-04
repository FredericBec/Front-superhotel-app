import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../model/hotel.model';
import { environment } from 'src/environments/environment';
import { City } from '../model/city.model';
import { HotelManager } from '../model/hotel-manager.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  public getHotels(){
    return this.http.get<Hotel[]>(environment.host + "/hotels");
  }

  public getHotelsByCity(id : number){
    return this.http.get<Hotel[]>(environment.host + "/hotels/city/" + id);
  }

  public getHotelsByKeyword(keyword : string){
    return this.http.get<Hotel[]>(environment.host + "/hotels/?keyword=" + keyword);
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

  public getCities(){
    return this.http.get<City[]>(environment.host + "/cities");
  }

  public getCityById(id : number){
    return this.http.get<City>(environment.host + "/cities/" + id);
  }

  public addNewCity(city : City){
    return this.http.post<City>(environment.host + "/cities", city);
  }

  public updateCity(id : number, city : City){
    return this.http.put<City>(environment.host + "/cities/" + id, city);
  }

  public deleteCity(id : number){
    return this.http.delete<City>(environment.host + "/cities/" + id);
  }

  /**
   * Requête permettant la connexion de l'utilisateur via jwt
   * en passant un body avec le username et le password encrypté
   * et le header nécessaire
   * @param username rentré par l'utilisateur
   * @param password rentré par l'utilisateur
   * @returns un observable de type HttpResponse
   */
  public getLoginByUsernamePassword(username : string, password : string){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded'
    })
    const body = new HttpParams()
            .set('username', username)
            .set('password', password);
    return this.http.post<any>(environment.auth + "/login", body, {headers, observe : 'response'});
  }

  public changePicture(trainingId : number , file : FormData){
    return this.http.post<any>(environment.host + "/photo/" + trainingId  , file);
  }

  public getHotelManagers(){
    return this.http.get<HotelManager[]>(environment.host + "/hotelManagers");
  }

  public addNewHotelManager(hotelManager : HotelManager){
    return this.http.post<HotelManager>(environment.host + "/hotelManagers", hotelManager);
  }

  public updateHotelManager(id : number, hotelManager : HotelManager){
    return this.http.put<HotelManager>(environment.host + "/hotelManagers/" + id, hotelManager);
  }

  public deleteHotelManager(id : number){
    return this.http.delete<HotelManager>(environment.host + "/hotelManagers/" + id);
  }

  public getHotelManagerById(id : number){
    return this.http.get<HotelManager>(environment.host + "/hotelManagers/" + id);
  }

  public getHotelsByHotelManager(id : number){
    return this.http.get<Hotel[]>(environment.host + "/hotels/hotelManager/" + id);
  }
}
