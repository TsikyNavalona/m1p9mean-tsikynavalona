import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCustomerComponent } from './profile-customer.component';

describe('ProfileCustomerComponent', () => {
  let component: ProfileCustomerComponent;
  let fixture: ComponentFixture<ProfileCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
