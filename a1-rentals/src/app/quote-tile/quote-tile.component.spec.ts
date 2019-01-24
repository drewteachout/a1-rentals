import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteTileComponent } from './quote-tile.component';

describe('QuoteTileComponent', () => {
  let component: QuoteTileComponent;
  let fixture: ComponentFixture<QuoteTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
