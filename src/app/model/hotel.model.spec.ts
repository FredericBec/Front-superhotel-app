import { City } from './city.model';
import { HotelManager } from './hotel-manager.model';
import { Hotel } from './hotel.model';

describe('Hotel', () => {
  it('should create an instance', () => {
    const toulouse = new City(1, "Toulouse");
    const hotelManager = new HotelManager(1, "El bab", "Momo");
    expect(new Hotel(1, "Rihad", "14 rue des étoiles", "0123456789", 2, 200, 50, "", toulouse, hotelManager)).toBeTruthy();
  });
});
