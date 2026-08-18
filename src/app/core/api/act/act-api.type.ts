import { Department } from '../../types/catalog.type';

export type Act = {
  title: string;
  type: string;
  category: string;
  author: string;
  department: Department;
  createdAt: number;
  editedAt: number;
};
