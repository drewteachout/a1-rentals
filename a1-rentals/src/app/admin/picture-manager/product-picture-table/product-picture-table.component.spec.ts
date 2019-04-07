import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPictureTableComponent } from './product-picture-table.component';

describe('ProductPictureTableComponent', () => {
  let component: ProductPictureTableComponent;
  let fixture: ComponentFixture<ProductPictureTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPictureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPictureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
