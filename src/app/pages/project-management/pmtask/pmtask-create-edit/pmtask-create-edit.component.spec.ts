import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtaskCreateEditComponent } from './pmtask-create-edit.component';

describe('PmtaskCreateEditComponent', () => {
  let component: PmtaskCreateEditComponent;
  let fixture: ComponentFixture<PmtaskCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtaskCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtaskCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
