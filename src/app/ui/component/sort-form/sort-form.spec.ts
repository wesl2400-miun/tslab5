import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortForm } from './sort-form';

describe('SortForm', () => {
  let component: SortForm;
  let fixture: ComponentFixture<SortForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SortForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
