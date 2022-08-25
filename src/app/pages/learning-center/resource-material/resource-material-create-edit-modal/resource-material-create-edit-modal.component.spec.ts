import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceMaterialCreateEditModalComponent } from './resource-material-create-edit-modal.component';

describe('ResourceMaterialCreateEditModalComponent', () => {
  let component: ResourceMaterialCreateEditModalComponent;
  let fixture: ComponentFixture<ResourceMaterialCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceMaterialCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceMaterialCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
