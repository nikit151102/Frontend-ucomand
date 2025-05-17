import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommandComponent } from './new-command.component';

describe('NewCommandComponent', () => {
  let component: NewCommandComponent;
  let fixture: ComponentFixture<NewCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCommandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
