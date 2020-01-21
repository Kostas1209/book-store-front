import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmountSymbolsPipe } from './services/pipes';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ AmountSymbolsPipe ],
 exports:      [ AmountSymbolsPipe, CommonModule  ]
})
export class SharedModule { }