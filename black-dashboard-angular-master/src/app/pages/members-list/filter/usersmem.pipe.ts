import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersmem'
})
export class UsersmemPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {

    const resultArray = [];

    if(!value || filterString === '' || propName === '')
    return value;

    for(const item of value){
      if(item[propName] === filterString){
        resultArray.push(item);
      }
    }

    return resultArray;

  }

}
