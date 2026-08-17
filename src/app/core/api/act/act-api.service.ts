import { Service } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { ACTS } from './act-api.mock';
import { Act } from './act-api.type';

@Service()
export class ActApiService {
  getList(): Observable<Act[]> {
    return timer(1000).pipe(map(() => ACTS));
  }
}
