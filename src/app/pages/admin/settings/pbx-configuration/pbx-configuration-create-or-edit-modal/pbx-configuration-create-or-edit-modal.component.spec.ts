import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbxConfigurationCreateOrEditModalComponent } from './pbx-configuration-create-or-edit-modal.component';

describe('PbxConfigurationCreateOrEditModalComponent', () => {
  let component: PbxConfigurationCreateOrEditModalComponent;
  let fixture: ComponentFixture<PbxConfigurationCreateOrEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbxConfigurationCreateOrEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbxConfigurationCreateOrEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
