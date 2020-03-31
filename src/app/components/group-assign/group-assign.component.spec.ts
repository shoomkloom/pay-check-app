import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssignComponent } from './group-assign.component';

describe('GroupAssignComponent', () => {
  let component: GroupAssignComponent;
  let fixture: ComponentFixture<GroupAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
