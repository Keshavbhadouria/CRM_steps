import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCreateEditComponent } from './country-create-edit.component';

describe('CountryCreateEditComponent', () => {
  let component: CountryCreateEditComponent;
  let fixture: ComponentFixture<CountryCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
