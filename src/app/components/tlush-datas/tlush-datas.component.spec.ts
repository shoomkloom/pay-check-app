import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlushDatasComponent } from './tlush-datas.component';

describe('TlushDatasComponent', () => {
  let component: TlushDatasComponent;
  let fixture: ComponentFixture<TlushDatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlushDatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlushDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
