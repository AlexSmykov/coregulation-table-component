import { DEPARTMENT } from '../consts/department.const';

export type Department = (typeof DEPARTMENT)[keyof typeof DEPARTMENT];
