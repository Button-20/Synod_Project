import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceStatementComponent } from './attendance-statement.component';

describe('AttendanceStatementComponent', () => {
  let component: AttendanceStatementComponent;
  let fixture: ComponentFixture<AttendanceStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
