import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesManagerComponent } from './references-manager.component';

describe('ReferencesManagerComponent', () => {
  let component: ReferencesManagerComponent;
  let fixture: ComponentFixture<ReferencesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
