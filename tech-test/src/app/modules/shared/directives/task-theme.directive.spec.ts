import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BACKGROUND_THEME, TaskThemeDirective } from './task-theme.directive';
import { TaskCategories } from '@tasks/models/task.model';
@Component({
  template: `
    <div
      [appTaskTheme]="{category: taskCategories.SPORT,theme: backgroundTheme.REGULAR, withIcon: false }"
    ></div>
  `
})
class HostComponent {
  public taskCategories = TaskCategories;
  public backgroundTheme = BACKGROUND_THEME;
}

describe('TaskThemeDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  let des: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskThemeDirective, HostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(TaskThemeDirective));
  });

  it('should have one highlighted elements', () => {
    expect(des.length).toBe(1);
  });

  it('should bind <div> class', () => {
    const divElement = des[0].nativeElement as HTMLDivElement;
    expect(divElement.classList[0]).toBe('sport');
  });
});


