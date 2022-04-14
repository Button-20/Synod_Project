import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantsListComponent } from './registrants-list.component';

describe('MembersListComponent', () => {
  let component: RegistrantsListComponent;
  let fixture: ComponentFixture<RegistrantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
