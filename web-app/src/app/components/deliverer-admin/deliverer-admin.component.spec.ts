import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererAdminComponent } from './deliverer-admin.component';

describe('DelivererAdminComponent', () => {
  let component: DelivererAdminComponent;
  let fixture: ComponentFixture<DelivererAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivererAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
