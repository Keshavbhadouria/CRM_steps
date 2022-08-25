import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicViewModalComponent } from './epic-view-modal.component';

describe('EpicViewModalComponent', () => {
  let component: EpicViewModalComponent;
  let fixture: ComponentFixture<EpicViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpicViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
