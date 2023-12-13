import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LentedBooksComponent } from './lented-books.component';

describe('LentedBooksComponent', () => {
  let component: LentedBooksComponent;
  let fixture: ComponentFixture<LentedBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LentedBooksComponent]
    });
    fixture = TestBed.createComponent(LentedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
