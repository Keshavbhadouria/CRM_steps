import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessActionTriggersComponent } from './business-action-triggers.component';

describe('BusinessActionTriggersComponent', () => {
  let component: BusinessActionTriggersComponent;
  let fixture: ComponentFixture<BusinessActionTriggersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessActionTriggersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessActionTriggersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
