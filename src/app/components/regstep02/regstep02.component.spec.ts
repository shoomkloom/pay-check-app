import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regstep02Component } from './regstep02.component';

describe('Regstep02Component', () => {
  let component: Regstep02Component;
  let fixture: ComponentFixture<Regstep02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regstep02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regstep02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
