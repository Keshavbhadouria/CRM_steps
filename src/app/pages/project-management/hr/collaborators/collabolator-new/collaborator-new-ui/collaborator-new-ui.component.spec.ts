import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorNewUIComponent } from './collaborator-new-ui.component';

describe('CollaboratorNewUIComponent', () => {
  let component: CollaboratorNewUIComponent;
  let fixture: ComponentFixture<CollaboratorNewUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorNewUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorNewUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
