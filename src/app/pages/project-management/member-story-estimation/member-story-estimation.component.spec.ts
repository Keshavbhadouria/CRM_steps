import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStoryEstimationComponent } from './member-story-estimation.component';

describe('MemberStoryEstimationComponent', () => {
  let component: MemberStoryEstimationComponent;
  let fixture: ComponentFixture<MemberStoryEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStoryEstimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStoryEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
