import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreTemplateAssignComponent } from './chore-template-assign.component';

describe('ChoreTemplateAssignComponent', () => {
  let component: ChoreTemplateAssignComponent;
  let fixture: ComponentFixture<ChoreTemplateAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreTemplateAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreTemplateAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
