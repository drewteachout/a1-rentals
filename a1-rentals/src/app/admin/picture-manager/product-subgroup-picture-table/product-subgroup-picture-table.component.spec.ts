import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubgroupPictureTableComponent } from './product-subgroup-picture-table.component';

describe('ProductSubgroupPictureTableComponent', () => {
  let component: ProductSubgroupPictureTableComponent;
  let fixture: ComponentFixture<ProductSubgroupPictureTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubgroupPictureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubgroupPictureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
