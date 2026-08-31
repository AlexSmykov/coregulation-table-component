import { Service } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { Page } from '../../types/pagination.type';
import { Search } from '../../types/search.type';
import { ACTS, ACTS_COUNT } from './act-api.mock';
import { Act } from './act-api.type';

@Service()
export class ActApiService {
  getList(search: Search): Observable<Page<Act>> {
    const pagination = search.pagination;
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
