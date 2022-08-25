import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsViewModalComponent } from './collaborators-view-modal.component';

describe('CollaboratorsViewModalComponent', () => {
  let component: CollaboratorsViewModalComponent;
  let fixture: ComponentFixture<CollaboratorsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
