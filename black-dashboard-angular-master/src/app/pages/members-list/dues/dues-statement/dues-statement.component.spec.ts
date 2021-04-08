import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuesStatementComponent } from './dues-statement.component';

describe('DuesStatementComponent', () => {
  let component: DuesStatementComponent;
  let fixture: ComponentFixture<DuesStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuesStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuesStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
