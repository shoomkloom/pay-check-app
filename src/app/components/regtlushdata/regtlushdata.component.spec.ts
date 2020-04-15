import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegTlushDataComponent } from './regtlushdata.component';

describe('RegTlushDataComponent', () => {
  let component: RegTlushDataComponent;
  let fixture: ComponentFixture<RegTlushDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegTlushDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegTlushDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
