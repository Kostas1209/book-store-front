import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
 
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
 
}   


@Pipe({
  name: 'amountSymbols'
})
export class AmountSymbolsPipe implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(value: string, amount : number): string {
    if(amount >= value.length)
    {
      return value;
    }
    else{
      return value.slice(0,amount) + "...";
    }
  }
 
}  