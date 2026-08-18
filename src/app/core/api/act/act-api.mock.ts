import { DEPARTMENT } from '../../consts/department.const';
import { NAMES, WORDS } from '../../consts/mock.const';
import { Department } from '../../types/catalog.type';
import { Act } from './act-api.type';

const ACTS_ITER = (count: number) => {
  const arr: Act[] = [];

  const departmentsList = Object.keys(DEPARTMENT);

  for (let i = 0; i < count; i++) {
    arr.push({
      title: WORDS[Math.floor(Math.random() * WORDS.length)],
      type: WORDS[Math.floor(Math.random() * WORDS.length)],
      category: WORDS[Math.floor(Math.random() * WORDS.length)],
      author: NAMES[Math.floor(Math.random() * WORDS.length)],
      department: departmentsList[Math.floor(Math.random() * departmentsList.length)] as Department,
      createdAt: Math.floor(Math.random() * 2000000000000),
      editedAt: Math.floor(Math.random() * 2000000000000),
    });
  }

  return arr;
};

export const ACTS_COUNT = 1000;

export const ACTS: Act[] = ACTS_ITER(1000);
