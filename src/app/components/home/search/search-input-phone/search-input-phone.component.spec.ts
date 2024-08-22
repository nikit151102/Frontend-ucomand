import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputPhoneComponent } from './search-input-phone.component';

describe('SearchInputPhoneComponent', () => {
  let component: SearchInputPhoneComponent;
  let fixture: ComponentFixture<SearchInputPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
