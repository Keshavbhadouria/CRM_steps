import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlosaryTermsCreateEditComponent } from './glosary-terms-create-edit.component';

describe('GlosaryTermsCreateEditComponent', () => {
  let component: GlosaryTermsCreateEditComponent;
  let fixture: ComponentFixture<GlosaryTermsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlosaryTermsCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlosaryTermsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
