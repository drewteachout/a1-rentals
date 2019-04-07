import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEmailManagerComponent } from './quote-email-manager.component';

describe('QuoteEmailManagerComponent', () => {
  let component: QuoteEmailManagerComponent;
  let fixture: ComponentFixture<QuoteEmailManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteEmailManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteEmailManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
