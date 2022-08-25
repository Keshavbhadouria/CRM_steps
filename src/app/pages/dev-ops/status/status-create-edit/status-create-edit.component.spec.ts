import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCreateEditComponent } from './status-create-edit.component';

describe('StatusCreateEditComponent', () => {
  let component: StatusCreateEditComponent;
  let fixture: ComponentFixture<StatusCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
