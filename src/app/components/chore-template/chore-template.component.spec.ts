import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreTemplateComponent } from './chore-template.component';

describe('ChoreTemplateComponent', () => {
  let component: ChoreTemplateComponent;
  let fixture: ComponentFixture<ChoreTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
