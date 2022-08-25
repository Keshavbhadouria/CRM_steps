import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryCreateEditModalComponent } from './industry-create-edit-modal.component';

describe('IndustryCreateEditModalComponent', () => {
  let component: IndustryCreateEditModalComponent;
  let fixture: ComponentFixture<IndustryCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
