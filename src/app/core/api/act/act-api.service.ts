import { Service } from '@angular/core';
import { PaginationState } from '@tanstack/angular-table';
import { map, Observable, timer } from 'rxjs';
import { Page } from '../../types/pagination.type';
import { ACTS, ACTS_COUNT } from './act-api.mock';
import { Act } from './act-api.type';

@Service()
export class ActApiService {
  getList(pagination: PaginationState): Observable<Page<Act>> {
    const sliceStart = pagination.pageSize * (pagination.pageIndex - 1);

    return timer(1000).pipe(
      map(() => {
        return {
          allItemsCount: ACTS_COUNT,
          items: ACTS.slice(sliceStart, sliceStart + pagination.pageSize),
        };
      }),
    );
  }
}
