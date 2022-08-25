import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDocumentCreateEditModalComponent } from './step-document-create-edit-modal.component';

describe('StepDocumentCreateEditModalComponent', () => {
  let component: StepDocumentCreateEditModalComponent;
  let fixture: ComponentFixture<StepDocumentCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDocumentCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDocumentCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
