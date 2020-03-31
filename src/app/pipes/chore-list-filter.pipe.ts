import { Pipe, PipeTransform } from '@angular/core';
import { ChoreListFilters } from './chore-list-filter';
import { Chore } from '../models/chore';
import { Helpers } from '../components/helpers';

@Pipe({
  name: 'choreListFilter',
  pure: false
})

export class ChoreListFilterPipe implements PipeTransform {
  myId: number;

  constructor(
    private helpers: Helpers
  ){
    this.myId = helpers.getCurrentUser()._id;
  }

  transform(items: Chore[], choreFilters: ChoreListFilters): any[] {
    if (!items) return [];
    if (!choreFilters) return items;
    
    return items.filter(item => {
      /*@@*/console.log('ChoreListFilterPipe choreFilters=', choreFilters);

      const includeMaster = item.masterId === this.myId && choreFilters.Master === true;
      const includeSlave = item.slaveId === this.myId && choreFilters.Slave === true;
      const includePending = item.state === 'Pending' && choreFilters.Pending === true;
      const includeDone = item.state === 'Done' && choreFilters.Done === true;
      const includeReject = item.state === 'Reject' && choreFilters.Reject === true;

      if((includeMaster || includeSlave) && 
        (includePending || includeDone || includeReject)){
          return true;
      }
      return false;
    });
  }
}
