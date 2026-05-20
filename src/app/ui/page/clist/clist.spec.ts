import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CList } from './clist';

describe('CList', () => {
  let component: CList;
  let fixture: ComponentFixture<CList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CList],
    }).compileComponents();

    fixture = TestBed.createComponent(CList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
