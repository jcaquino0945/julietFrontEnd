import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordDetailsComponent } from './forgot-password-details.component';

describe('ForgotPasswordDetailsComponent', () => {
  let component: ForgotPasswordDetailsComponent;
  let fixture: ComponentFixture<ForgotPasswordDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
