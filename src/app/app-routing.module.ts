import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TaskTodoDetailComponent } from './components/task-todo-detail/task-todo-detail.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main-page',
    pathMatch: 'prefix',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task-detail/:id',
    pathMatch: 'prefix',
    component: TaskTodoDetailComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
