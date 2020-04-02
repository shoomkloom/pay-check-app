import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Regstep01Component } from './regstep01.component';

describe('Regstep01Component', () => {
  let component: Regstep01Component;
  let fixture: ComponentFixture<Regstep01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Regstep01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Regstep01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
