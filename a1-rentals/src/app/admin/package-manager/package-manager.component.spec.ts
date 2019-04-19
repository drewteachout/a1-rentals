import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageManagerComponent } from './package-manager.component';

describe('PackageManagerComponent', () => {
  let component: PackageManagerComponent;
  let fixture: ComponentFixture<PackageManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
