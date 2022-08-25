import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicStatusCreateEditModalComponent } from './epic-status-create-edit-modal.component';

describe('EpicStatusCreateEditModalComponent', () => {
  let component: EpicStatusCreateEditModalComponent;
  let fixture: ComponentFixture<EpicStatusCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicStatusCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicStatusCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
