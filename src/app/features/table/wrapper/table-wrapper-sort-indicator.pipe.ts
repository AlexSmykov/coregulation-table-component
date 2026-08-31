import { Pipe, PipeTransform } from '@angular/core';

const sortIndicators: Record<'asc' | 'desc', string> = {
  asc: ' ^',
  desc: ' v',
};

@Pipe({
  name: 'appTableWrapperSortIndicator',
  standalone: true,
})
export class AppTableWrapperSortIndicatorPipe implements PipeTransform {
  transform(sortDirection: false | 'asc' | 'desc'): string | null {
    return sortDirection ? sortIndicators[sortDirection] : null;
  }
}
