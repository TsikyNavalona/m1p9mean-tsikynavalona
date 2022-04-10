import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDelivererComponent } from './order-deliverer.component';

describe('OrderDelivererComponent', () => {
  let component: OrderDelivererComponent;
  let fixture: ComponentFixture<OrderDelivererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDelivererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDelivererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
