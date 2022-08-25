import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicCreateEditModalComponent } from './epic-create-edit-modal.component';

describe('EpicCreateEditModalComponent', () => {
  let component: EpicCreateEditModalComponent;
  let fixture: ComponentFixture<EpicCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
