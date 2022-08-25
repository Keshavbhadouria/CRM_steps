import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsCreateEditComponent } from './tenants-create-edit.component';

describe('TenantsCreateEditComponent', () => {
  let component: TenantsCreateEditComponent;
  let fixture: ComponentFixture<TenantsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantsCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
