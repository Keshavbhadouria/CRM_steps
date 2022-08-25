import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorAbsenseComponent } from './collaborator-absense.component';

describe('CollaboratorAbsenseComponent', () => {
  let component: CollaboratorAbsenseComponent;
  let fixture: ComponentFixture<CollaboratorAbsenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorAbsenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorAbsenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
