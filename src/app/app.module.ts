import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { UsersListComponent } from '@/pages/users-list/users-list.component';
import { LearningsListComponent } from '@/pages/learnings-list/learnings-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LearningsListComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
