import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOfDayComponent } from './item-of-day.component';

describe('ItemOfDayComponent', () => {
  let component: ItemOfDayComponent;
  let fixture: ComponentFixture<ItemOfDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});