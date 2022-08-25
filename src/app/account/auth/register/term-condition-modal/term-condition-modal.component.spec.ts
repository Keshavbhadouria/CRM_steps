import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermConditionModalComponent } from './term-condition-modal.component';

describe('TermConditionModalComponent', () => {
  let component: TermConditionModalComponent;
  let fixture: ComponentFixture<TermConditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermConditionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
