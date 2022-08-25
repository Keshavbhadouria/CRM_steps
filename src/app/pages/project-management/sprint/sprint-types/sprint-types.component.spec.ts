import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTypesComponent } from './sprint-types.component';

describe('SprintTypesComponent', () => {
  let component: SprintTypesComponent;
  let fixture: ComponentFixture<SprintTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
