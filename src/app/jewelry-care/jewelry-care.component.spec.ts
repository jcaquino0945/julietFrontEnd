import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelryCareComponent } from './jewelry-care.component';

describe('JewelryCareComponent', () => {
  let component: JewelryCareComponent;
  let fixture: ComponentFixture<JewelryCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewelryCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JewelryCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
