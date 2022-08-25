import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceMaterialComponent } from './resource-material.component';

describe('ResourceMaterialComponent', () => {
  let component: ResourceMaterialComponent;
  let fixture: ComponentFixture<ResourceMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
