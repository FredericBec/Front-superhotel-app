import { HotelManager } from './hotel-manager.model';

describe('HotelManager', () => {
  it('should create an instance', () => {
    expect(new HotelManager(1, "El bab", "Momo")).toBeTruthy();
  });
});
