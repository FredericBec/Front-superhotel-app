import { City } from './city.model';

describe('City', () => {
  it('should create an instance', () => {
    expect(new City(1, "Toulouse")).toBeTruthy();
  });
});
