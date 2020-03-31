import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'choreTemplateCreator',
  pure: false
})
export class ChoreTemplateCreatorPipe implements PipeTransform {

  transform(items: any[], creatorId: number): any[] {
    if (!items) return [];
    if (!creatorId) return items;
  
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return item[key] === creatorId;
      });
    });
   }
}
