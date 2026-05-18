import { TestBed } from '@angular/core/testing';

import { Sorter } from './sorter';

describe('Sorter', () => {
  let service: Sorter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sorter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
