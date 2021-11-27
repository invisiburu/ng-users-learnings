import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { environment } from '@env';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { UsersListComponent } from '@/pages/users-list/users-list.component';
import { LearningsListComponent } from '@/pages/learnings-list/learnings-list.component';
import { NavigationComponent } from '@/components/navigation/navigation.component';
import { AvatarComponent } from '@/components/avatar/avatar.component';
import { PageHeadComponent } from '@/components/page-head/page-head.component';
import { ApiInterceptor } from '@/interceptors/api.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModal } from '@/modals/create-user/create-user.modal';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LearningsListComponent,
    NavigationComponent,
    AvatarComponent,
    PageHeadComponent,
    CreateUserModal,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
    { provide: 'BASE_API_URL', useValue: environment.api },
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
