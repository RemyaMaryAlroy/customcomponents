import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragnddropComponent } from './dragnddrop.component';

describe('DragnddropComponent', () => {
  let component: DragnddropComponent;
  let fixture: ComponentFixture<DragnddropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragnddropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragnddropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
