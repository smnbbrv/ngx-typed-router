import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ExampleModule } from './example/example.module';
import { ExampleRoutes } from './example/example.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/test/123?param1=name', pathMatch: 'full' },
      ...ExampleRoutes
    ]),
    ExampleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
