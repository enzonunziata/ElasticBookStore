import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBookComponent } from './page-book.component';

describe('PageBookComponent', () => {
  let component: PageBookComponent;
  let fixture: ComponentFixture<PageBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
