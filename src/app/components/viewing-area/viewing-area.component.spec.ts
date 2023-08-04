/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewingAreaComponent } from './viewing-area.component';

describe('ViewingAreaComponent', () => {
  let component: ViewingAreaComponent;
  let fixture: ComponentFixture<ViewingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
