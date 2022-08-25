import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexCreateEditComponent } from './sex-create-edit.component';

describe('SexCreateEditComponent', () => {
  let component: SexCreateEditComponent;
  let fixture: ComponentFixture<SexCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SexCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
