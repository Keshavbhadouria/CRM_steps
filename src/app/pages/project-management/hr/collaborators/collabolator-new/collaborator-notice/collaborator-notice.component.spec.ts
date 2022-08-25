import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorNoticeComponent } from './collaborator-notice.component';

describe('CollaboratorNoticeComponent', () => {
  let component: CollaboratorNoticeComponent;
  let fixture: ComponentFixture<CollaboratorNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
