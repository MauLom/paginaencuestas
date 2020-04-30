import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
 transform(value) : any {
    if(!value) {
      return null;
    }
    return Object.keys(value).sort((a, b) => {
      var a1:number = Number(a.substr(1, a.length));
      var b1:number = Number(b.substr(1, b.length));
      return  a1 - b1;
      // if (a > b) { return 1; } else { return 0; } 
    });
  }
}
