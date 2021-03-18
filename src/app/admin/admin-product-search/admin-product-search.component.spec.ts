import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductSearchComponent } from './admin-product-search.component';

describe('AdminProductSearchComponent', () => {
  let component: AdminProductSearchComponent;
  let fixture: ComponentFixture<AdminProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
