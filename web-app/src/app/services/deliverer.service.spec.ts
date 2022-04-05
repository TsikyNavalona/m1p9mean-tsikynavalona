import { TestBed } from '@angular/core/testing';

import { DelivererService } from './deliverer.service';

describe('DelivererService', () => {
  let service: DelivererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelivererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
