import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupTableComponent } from './product-group-table.component';

describe('ProductGroupTableComponent', () => {
  let component: ProductGroupTableComponent;
  let fixture: ComponentFixture<ProductGroupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
