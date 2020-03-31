import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreHistoryListComponent } from './chore-history-list.component';

describe('ChoreHistoryListComponent', () => {
  let component: ChoreHistoryListComponent;
  let fixture: ComponentFixture<ChoreHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
