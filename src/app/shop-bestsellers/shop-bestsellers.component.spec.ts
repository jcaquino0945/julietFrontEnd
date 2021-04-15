import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBestsellersComponent } from './shop-bestsellers.component';

describe('ShopBestsellersComponent', () => {
  let component: ShopBestsellersComponent;
  let fixture: ComponentFixture<ShopBestsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBestsellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
