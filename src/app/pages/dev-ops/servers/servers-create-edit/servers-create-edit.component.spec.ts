import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersCreateEditComponent } from './servers-create-edit.component';

describe('ServersCreateEditComponent', () => {
  let component: ServersCreateEditComponent;
  let fixture: ComponentFixture<ServersCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServersCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
