import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRecentlyAddedComponent } from './shop-recently-added.component';

describe('ShopRecentlyAddedComponent', () => {
  let component: ShopRecentlyAddedComponent;
  let fixture: ComponentFixture<ShopRecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopRecentlyAddedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
