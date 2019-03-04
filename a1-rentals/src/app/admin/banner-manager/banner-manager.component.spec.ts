import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerManagerComponent } from './banner-manager.component';

describe('BannerManagerComponent', () => {
  let component: BannerManagerComponent;
  let fixture: ComponentFixture<BannerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
