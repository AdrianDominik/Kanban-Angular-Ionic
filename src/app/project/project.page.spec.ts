import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { projectPage } from './project.page';

describe('projectPage', () => {
  let component: projectPage;
  let fixture: ComponentFixture<projectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ projectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(projectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
