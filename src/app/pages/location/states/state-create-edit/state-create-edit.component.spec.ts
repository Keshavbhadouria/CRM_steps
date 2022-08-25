import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCreateEditComponent } from './state-create-edit.component';

describe('StateCreateEditComponent', () => {
  let component: StateCreateEditComponent;
  let fixture: ComponentFixture<StateCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
