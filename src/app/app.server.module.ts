import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    BrowserModule.withServerTransition({ appId: 'Kostya\'s book store' }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
