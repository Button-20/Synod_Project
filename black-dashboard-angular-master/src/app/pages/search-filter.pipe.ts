import { User } from './../shared/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(user: User[], searchTerm: string): User[] {
    if(!user || !searchTerm)
    return user;

    return user.filter(user =>
      user.classname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.firstname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.othername.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.lastname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.email.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.phonenumber.toString().includes(searchTerm.toLocaleLowerCase()) 

    )
  }

}
