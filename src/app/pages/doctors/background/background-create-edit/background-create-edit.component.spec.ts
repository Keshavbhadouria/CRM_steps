import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundCreateEditComponent } from './background-create-edit.component';

describe('BackgroundCreateEditComponent', () => {
  let component: BackgroundCreateEditComponent;
  let fixture: ComponentFixture<BackgroundCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
