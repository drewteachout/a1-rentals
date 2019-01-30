import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCartComponent } from './quote-cart.component';

describe('QuoteCartComponent', () => {
  let component: QuoteCartComponent;
  let fixture: ComponentFixture<QuoteCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
