import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbxConfigurationComponent } from './pbx-configuration.component';

describe('PbxConfigurationComponent', () => {
  let component: PbxConfigurationComponent;
  let fixture: ComponentFixture<PbxConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbxConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbxConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
