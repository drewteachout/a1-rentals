import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupPictureTableComponent } from './product-group-picture-table.component';

describe('ProductGroupPictureTableComponent', () => {
  let component: ProductGroupPictureTableComponent;
  let fixture: ComponentFixture<ProductGroupPictureTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupPictureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupPictureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
