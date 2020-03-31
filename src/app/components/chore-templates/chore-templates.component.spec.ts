import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreTemplatesComponent } from './chore-templates.component';

describe('ChoreTemplatesComponent', () => {
  let component: ChoreTemplatesComponent;
  let fixture: ComponentFixture<ChoreTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
