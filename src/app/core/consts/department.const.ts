import { Department } from '../types/catalog.type';

export const DEPARTMENT = {
  agency: 'agency',
  federal: 'federal',
  admin: 'admin',
} as const;

export const DEPARTMENT_NAMES: Record<Department, string> = {
  [DEPARTMENT.agency]: 'Агенство',
  [DEPARTMENT.federal]: 'Федералы',
  [DEPARTMENT.admin]: 'Администрация',
};
