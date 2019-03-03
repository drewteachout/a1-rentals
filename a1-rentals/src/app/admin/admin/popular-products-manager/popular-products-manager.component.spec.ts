import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductsManagerComponent } from './popular-products-manager.component';

describe('PopularProductsManagerComponent', () => {
  let component: PopularProductsManagerComponent;
  let fixture: ComponentFixture<PopularProductsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularProductsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
