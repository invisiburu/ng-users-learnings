import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { environment } from '@env';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { UsersListComponent } from '@/pages/users-list/users-list.component';
import { LearningsListComponent } from '@/pages/learnings-list/learnings-list.component';
import { NavigationComponent } from '@/components/navigation/navigation.component';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LearningsListComponent,
    NavigationComponent,
    AvatarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
