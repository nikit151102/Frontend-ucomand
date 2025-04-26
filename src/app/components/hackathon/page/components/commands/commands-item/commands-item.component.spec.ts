import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsItemComponent } from './commands-item.component';

describe('CommandsItemComponent', () => {
  let component: CommandsItemComponent;
  let fixture: ComponentFixture<CommandsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandsItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
