import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbxConfigurationViewModalComponent } from './pbx-configuration-view-modal.component';

describe('PbxConfigurationViewModalComponent', () => {
  let component: PbxConfigurationViewModalComponent;
  let fixture: ComponentFixture<PbxConfigurationViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbxConfigurationViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbxConfigurationViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
