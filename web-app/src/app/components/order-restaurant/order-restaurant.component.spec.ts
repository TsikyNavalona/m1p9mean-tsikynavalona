import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRestaurantComponent } from './order-restaurant.component';

describe('OrderRestaurantComponent', () => {
  let component: OrderRestaurantComponent;
  let fixture: ComponentFixture<OrderRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
