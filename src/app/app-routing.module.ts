import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from '@/pages/users-list/users-list.component';
import { LearningsListComponent } from '@/pages/learnings-list/learnings-list.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'learnings', component: LearningsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
