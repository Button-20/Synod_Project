import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuesListComponent } from './dues-list.component';

describe('DuesListComponent', () => {
  let component: DuesListComponent;
  let fixture: ComponentFixture<DuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
