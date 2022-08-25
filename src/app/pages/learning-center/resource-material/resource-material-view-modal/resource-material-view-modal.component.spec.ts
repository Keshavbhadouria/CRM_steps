import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceMaterialViewModalComponent } from './resource-material-view-modal.component';

describe('ResourceMaterialViewModalComponent', () => {
  let component: ResourceMaterialViewModalComponent;
  let fixture: ComponentFixture<ResourceMaterialViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceMaterialViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceMaterialViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
