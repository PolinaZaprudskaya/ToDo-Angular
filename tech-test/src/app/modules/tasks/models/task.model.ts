export interface Task {
  id: number;
  label: string;
  description: string;
  category: TaskCategories;
  done: Date | boolean;
}

export enum TaskCategories {
  SPORT = 'sport',
  WORK = 'work',
  HOUSE = 'house',
  HEALTH = 'health',
  BUREAUCRACY = 'bureaucracy',
  EDUCATION = 'education',
}
