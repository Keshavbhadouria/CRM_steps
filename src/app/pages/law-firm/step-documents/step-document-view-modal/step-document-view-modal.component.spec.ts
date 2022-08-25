import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDocumentViewModalComponent } from './step-document-view-modal.component';

describe('StepDocumentViewModalComponent', () => {
  let component: StepDocumentViewModalComponent;
  let fixture: ComponentFixture<StepDocumentViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDocumentViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDocumentViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
