import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app/view/component';
import { appRoutes, appRoutingOpts } from '../app/routing';

import { HomeComponent } from '../home/view/home.component';

import { SharedModule } from '../shared/module';

// import global styles common to all app modules
import '../../styles/styles.css';

@NgModule({
  imports: [
    // third-party modules
    BrowserModule,
    HttpModule,

    // custom routing
    RouterModule.forRoot(appRoutes, appRoutingOpts),

    // custom feature modules
    SharedModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
  ],
})
export class AppModule {
}
