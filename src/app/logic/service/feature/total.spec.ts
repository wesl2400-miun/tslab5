import { TestBed } from '@angular/core/testing';

import { Total } from './total';

describe('Total', () => {
  let service: Total;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Total);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
