import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignObjectivesViewComponent } from './campaign-objectives-view.component';

describe('CampaignObjectivesViewComponent', () => {
  let component: CampaignObjectivesViewComponent;
  let fixture: ComponentFixture<CampaignObjectivesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignObjectivesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignObjectivesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
