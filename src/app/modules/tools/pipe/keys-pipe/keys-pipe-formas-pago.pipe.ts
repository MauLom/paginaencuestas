import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'keysformapago'
})
export class KeysPipeFormaPago implements PipeTransform {
 transform(value) : any {
    if(!value) {
      return null;
    }    
    return ["semestral", "trimestral", "mensual","nomina","semanal dxn","quincenal dxn"];
  }
}
