import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskCategories } from '@tasks/models/task.model';

export enum BACKGROUND_THEME {
  LIGHT = 'light',
  REGULAR = 'regular',
}

@Directive({
  selector: '[appTaskTheme]'
})
export class TaskThemeDirective implements OnChanges {
  @Input() appTaskTheme!: {
    category: TaskCategories,
    theme: BACKGROUND_THEME,
    withIcon?: boolean,
  };
  @HostBinding() class?: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const { category, withIcon, theme } = this.appTaskTheme;
    switch (category) {
      case TaskCategories.BUREAUCRACY: {
        this.class =
          (theme === BACKGROUND_THEME.LIGHT ? 'bureaucracy-light' : 'bureaucracy') + ' ' +
          (!!withIcon ? 'bureaucracy-icon' : '');
        break;
      }
      case TaskCategories.HEALTH: {
        this.class =
          (theme === BACKGROUND_THEME.LIGHT ? 'health-light' : 'health') + ' ' +
          (!!withIcon ? 'health-icon' : '');
        break;
      }
      case TaskCategories.HOUSE: {
        this.class =
          (theme === BACKGROUND_THEME.LIGHT ? 'house-light' : 'house') + ' ' +
          (!!withIcon ? 'house-icon' : '');
        break;
      }
      case TaskCategories.WORK: {
        this.class =
          (theme === BACKGROUND_THEME.LIGHT ? 'work-light' : 'work') + ' ' +
          (!!withIcon ? 'work-icon' : '');
        break;
      }
      case TaskCategories.SPORT: {
        this.class =
          (theme === BACKGROUND_THEME.LIGHT ? 'sport-light' : 'sport') + ' ' +
          (!!withIcon ? 'sport-icon' : '');
        break;
      }
      case TaskCategories.EDUCATION: {
        this.class =
          (theme === BACKGROUND_THEME.LIGHT ? 'education-light' : 'education') + ' ' +
          (!!withIcon ? 'education-icon' : '');
        break;
      }
    }
  }

}
