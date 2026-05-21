import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterForm } from './filter-form';

describe('FilterForm', () => {
  let component: FilterForm;
  let fixture: ComponentFixture<FilterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
