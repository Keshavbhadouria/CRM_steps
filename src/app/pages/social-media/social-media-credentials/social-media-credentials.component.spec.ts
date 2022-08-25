import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaCredentialsComponent } from './social-media-credentials.component';

describe('SocialMediaCredentialsComponent', () => {
  let component: SocialMediaCredentialsComponent;
  let fixture: ComponentFixture<SocialMediaCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
