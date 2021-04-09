import { Dues } from './../../../shared/dues.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statementFilter'
})
export class StatementFilterPipe implements PipeTransform {

  transform(dues: Dues[], searchTerm: string): Dues[] {
    if(!dues || !searchTerm)
    return dues;

    return dues.filter(dues =>
      dues.membername.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  }

}
