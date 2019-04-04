import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDropComponent } from './picture-drop.component';

describe('PictureDropComponent', () => {
  let component: PictureDropComponent;
  let fixture: ComponentFixture<PictureDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
