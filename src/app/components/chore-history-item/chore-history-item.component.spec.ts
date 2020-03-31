import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreHistoryItemComponent } from './chore-history-item.component';

describe('ChoreHistoryItemComponent', () => {
  let component: ChoreHistoryItemComponent;
  let fixture: ComponentFixture<ChoreHistoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreHistoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
