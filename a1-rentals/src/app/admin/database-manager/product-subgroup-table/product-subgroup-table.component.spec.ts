import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubgroupTableComponent } from './product-subgroup-table.component';

describe('ProductSubgroupTableComponent', () => {
  let component: ProductSubgroupTableComponent;
  let fixture: ComponentFixture<ProductSubgroupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubgroupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubgroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
