import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTenantResultComponent } from './register-tenant-result.component';

describe('RegisterTenantResultComponent', () => {
  let component: RegisterTenantResultComponent;
  let fixture: ComponentFixture<RegisterTenantResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTenantResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTenantResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
