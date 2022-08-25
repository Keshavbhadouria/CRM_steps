import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBusinessActionEmailApiComponent } from './call-business-action-email-api.component';

describe('CallBusinessActionEmailApiComponent', () => {
  let component: CallBusinessActionEmailApiComponent;
  let fixture: ComponentFixture<CallBusinessActionEmailApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallBusinessActionEmailApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallBusinessActionEmailApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
