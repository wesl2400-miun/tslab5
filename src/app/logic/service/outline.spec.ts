import { TestBed } from '@angular/core/testing';

import { Outline } from './outline';

describe('Outline', () => {
  let service: Outline;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Outline);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
