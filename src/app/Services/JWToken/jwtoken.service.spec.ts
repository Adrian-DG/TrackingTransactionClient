import { TestBed } from '@angular/core/testing';

import { JwtokenService } from './jwtoken.service';

describe('JwtokenService', () => {
  let service: JwtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
