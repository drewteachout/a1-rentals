import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureManagerComponent } from './picture-manager.component';

describe('PictureManagerComponent', () => {
  let component: PictureManagerComponent;
  let fixture: ComponentFixture<PictureManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
