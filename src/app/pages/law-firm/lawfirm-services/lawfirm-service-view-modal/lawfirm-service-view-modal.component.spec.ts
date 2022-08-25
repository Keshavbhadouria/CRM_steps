import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawfirmServiceViewModalComponent } from './lawfirm-service-view-modal.component';

describe('LawfirmServiceViewModalComponent', () => {
  let component: LawfirmServiceViewModalComponent;
  let fixture: ComponentFixture<LawfirmServiceViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawfirmServiceViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawfirmServiceViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
