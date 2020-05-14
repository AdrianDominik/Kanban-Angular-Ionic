import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtablePage } from './addtable.page';

describe('AddtablePage', () => {
  let component: AddtablePage;
  let fixture: ComponentFixture<AddtablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
