import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorInfoComponent } from './motor-info.component';

describe('MotorInfoComponent', () => {
  let component: MotorInfoComponent;
  let fixture: ComponentFixture<MotorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
