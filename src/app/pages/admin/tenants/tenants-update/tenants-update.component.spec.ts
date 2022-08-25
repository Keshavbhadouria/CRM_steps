import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsUpdateComponent } from './tenants-update.component';

describe('TenantsUpdateComponent', () => {
  let component: TenantsUpdateComponent;
  let fixture: ComponentFixture<TenantsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
