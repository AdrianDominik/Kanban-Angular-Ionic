import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { addprojectPage } from './addproject.page';

describe('addprojectPage', () => {
  let component: addprojectPage;
  let fixture: ComponentFixture<addprojectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addprojectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addprojectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
