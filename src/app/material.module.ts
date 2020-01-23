import { NgModule } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
imports: [MatExpansionModule, MatIconModule, MatBadgeModule, MatSnackBarModule, MatProgressBarModule],
exports: [MatExpansionModule, MatIconModule, MatBadgeModule, MatSnackBarModule, MatProgressBarModule]
})
export class MaterialAppModule { }