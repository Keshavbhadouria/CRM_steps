import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintViewModalComponent } from './sprint-view-modal.component';

describe('SprintViewModalComponent', () => {
  let component: SprintViewModalComponent;
  let fixture: ComponentFixture<SprintViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
