import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeTypeComponent } from './shape-type.component';

describe('ShapeTypeComponent', () => {
  let component: ShapeTypeComponent;
  let fixture: ComponentFixture<ShapeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
