import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsViewModalComponent } from './skills-view-modal.component';

describe('SkillsViewModalComponent', () => {
  let component: SkillsViewModalComponent;
  let fixture: ComponentFixture<SkillsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
