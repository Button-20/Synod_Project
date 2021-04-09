import { Registrant } from '../../../shared/registrant.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memFilter'
})
export class MemFilterPipe implements PipeTransform {

  transform(registrant: Registrant[], searchTerm: string): Registrant[] {
    if(!registrant || !searchTerm)
    return registrant;

    return registrant.filter(registrant =>
      registrant.firstname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      registrant.othername.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      registrant.lastname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      registrant.category.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      registrant.phonenumber.toString().includes(searchTerm.toLocaleLowerCase()) 

    )
  }

}
