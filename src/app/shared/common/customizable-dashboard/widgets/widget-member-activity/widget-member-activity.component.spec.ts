import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMemberActivityComponent } from './widget-member-activity.component';

describe('WidgetMemberActivityComponent', () => {
  let component: WidgetMemberActivityComponent;
  let fixture: ComponentFixture<WidgetMemberActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetMemberActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetMemberActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
