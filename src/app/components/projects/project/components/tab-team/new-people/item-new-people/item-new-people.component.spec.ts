import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNewPeopleComponent } from './item-new-people.component';

describe('ItemNewPeopleComponent', () => {
  let component: ItemNewPeopleComponent;
  let fixture: ComponentFixture<ItemNewPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemNewPeopleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemNewPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
