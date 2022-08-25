import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryViewModalComponent } from './industry-view-modal.component';

describe('IndustryViewModalComponent', () => {
  let component: IndustryViewModalComponent;
  let fixture: ComponentFixture<IndustryViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
