import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRetainerComponent } from './new-retainer.component';

describe('NewRetainerComponent', () => {
  let component: NewRetainerComponent;
  let fixture: ComponentFixture<NewRetainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRetainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRetainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
