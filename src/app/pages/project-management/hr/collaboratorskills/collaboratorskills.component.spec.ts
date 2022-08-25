import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorskillsComponent } from './collaboratorskills.component';

describe('CollaboratorskillsComponent', () => {
  let component: CollaboratorskillsComponent;
  let fixture: ComponentFixture<CollaboratorskillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorskillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
