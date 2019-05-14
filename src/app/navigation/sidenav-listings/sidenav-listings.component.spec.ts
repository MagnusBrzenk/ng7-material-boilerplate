import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListingsComponent } from './sidenav-listings.component';

describe('SidenavListingsComponent', () => {
  let component: SidenavListingsComponent;
  let fixture: ComponentFixture<SidenavListingsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavListingsComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
