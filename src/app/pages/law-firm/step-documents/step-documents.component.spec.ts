import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDocumentsComponent } from './step-documents.component';

describe('StepDocumentsComponent', () => {
  let component: StepDocumentsComponent;
  let fixture: ComponentFixture<StepDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
