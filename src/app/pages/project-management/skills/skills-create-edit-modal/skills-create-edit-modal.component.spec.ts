import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsCreateEditModalComponent } from './skills-create-edit-modal.component';

describe('SkillsCreateEditModalComponent', () => {
  let component: SkillsCreateEditModalComponent;
  let fixture: ComponentFixture<SkillsCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
