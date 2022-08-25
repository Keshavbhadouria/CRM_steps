import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicStatusViewModalComponent } from './epic-status-view-modal.component';

describe('EpicStatusViewModalComponent', () => {
  let component: EpicStatusViewModalComponent;
  let fixture: ComponentFixture<EpicStatusViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicStatusViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicStatusViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
