import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetablePage } from './updatetable.page';

describe('UpdatetablePage', () => {
  let component: UpdatetablePage;
  let fixture: ComponentFixture<UpdatetablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatetablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
