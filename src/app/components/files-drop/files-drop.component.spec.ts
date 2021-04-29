import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesDropComponent } from './files-drop.component';

describe('FilesDropComponent', () => {
  let component: FilesDropComponent;
  let fixture: ComponentFixture<FilesDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
