import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawfirmServiceCreateEditModalComponent } from './lawfirm-service-create-edit-modal.component';

describe('LawfirmServiceCreateEditModalComponent', () => {
  let component: LawfirmServiceCreateEditModalComponent;
  let fixture: ComponentFixture<LawfirmServiceCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawfirmServiceCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawfirmServiceCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
