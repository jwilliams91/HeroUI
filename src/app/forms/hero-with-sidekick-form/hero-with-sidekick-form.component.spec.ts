/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeroWithSidekickFormComponent } from './hero-with-sidekick-form.component';

describe('HeroWithSidekickFormComponent', () => {
  let component: HeroWithSidekickFormComponent;
  let fixture: ComponentFixture<HeroWithSidekickFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroWithSidekickFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroWithSidekickFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
