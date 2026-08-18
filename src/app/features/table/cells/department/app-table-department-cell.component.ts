import { Component, input } from '@angular/core';
import { DEPARTMENT_NAMES } from '../../../../core/consts/department.const';
import { Department } from '../../../../core/types/catalog.type';

@Component({
  selector: 'app-table-department-cell',
  templateUrl: './app-table-department-cell.component.html',
  styleUrl: './app-table-department-cell.component.scss',
  imports: [],
})
export class AppTableDepartmentCellComponent {
  readonly department = input.required<Department>();

  readonly names = DEPARTMENT_NAMES;
}
