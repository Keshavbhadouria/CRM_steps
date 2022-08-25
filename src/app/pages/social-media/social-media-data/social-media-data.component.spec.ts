import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaDataComponent } from './social-media-data.component';

describe('SocialMediaDataComponent', () => {
  let component: SocialMediaDataComponent;
  let fixture: ComponentFixture<SocialMediaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
