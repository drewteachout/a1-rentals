import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoManagerComponent } from './contact-info-manager.component';

describe('ContactInfoManagerComponent', () => {
  let component: ContactInfoManagerComponent;
  let fixture: ComponentFixture<ContactInfoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
