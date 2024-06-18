import { City } from "./city.model";

export class Hotel {
    id : number;
    name : string;
    address : string;
    phone : string;
    star : number;
    room : number;
    price : number;
    photo : string;
    city : City;

    constructor(id: number, name : string, address : string, phone : string, star : number, room : number, price : number, photo : string, city : City){
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.star = star;
        this.room = room;
        this.price = price;
        this.photo = photo;
        this.city = city;
    }
}
