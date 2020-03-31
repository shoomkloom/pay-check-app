import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreTemplateCreateComponent } from './chore-template-create.component';

describe('ChoreTemplateCreateComponent', () => {
  let component: ChoreTemplateCreateComponent;
  let fixture: ComponentFixture<ChoreTemplateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreTemplateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
