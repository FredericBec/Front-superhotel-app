import { TestBed } from '@angular/core/testing';

import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JwtInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      JwtInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptorInterceptor = TestBed.inject(JwtInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
