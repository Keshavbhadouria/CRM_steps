import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawfirmServicesComponent } from './lawfirm-services.component';

describe('LawfirmServicesComponent', () => {
  let component: LawfirmServicesComponent;
  let fixture: ComponentFixture<LawfirmServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawfirmServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawfirmServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
