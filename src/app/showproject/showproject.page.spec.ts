import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowprojectPage } from './showproject.page';

describe('ShowprojectPage', () => {
  let component: ShowprojectPage;
  let fixture: ComponentFixture<ShowprojectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowprojectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowprojectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
