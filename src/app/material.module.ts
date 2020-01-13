import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
imports: [MatExpansionModule, MatIconModule, MatBadgeModule],
exports: [MatExpansionModule, MatIconModule, MatBadgeModule]
})
export class MaterialAppModule { }