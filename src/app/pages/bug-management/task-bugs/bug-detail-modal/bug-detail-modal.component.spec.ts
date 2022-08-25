import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDetailModalComponent } from './bug-detail-modal.component';

describe('BugDetailModalComponent', () => {
  let component: BugDetailModalComponent;
  let fixture: ComponentFixture<BugDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
