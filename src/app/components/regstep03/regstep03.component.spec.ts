import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regstep03Component } from './regstep03.component';

describe('Regstep03Component', () => {
  let component: Regstep03Component;
  let fixture: ComponentFixture<Regstep03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regstep03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regstep03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
