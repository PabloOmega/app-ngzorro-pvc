import { TestBed } from '@angular/core/testing';

import { ProductsSBService } from './products-sb.service';

describe('ProductsSBService', () => {
  let service: ProductsSBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
