import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpritStatusComponent } from './sprit-status.component';

describe('SpritStatusComponent', () => {
  let component: SpritStatusComponent;
  let fixture: ComponentFixture<SpritStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpritStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpritStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
