import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { WeatherComponent } from './weather/weather.component';
import { UserDetailTasksComponent } from './user-detail-tasks/user-detail-tasks.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  /* { path: '', component: DashboardComponent }, */
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'weather', component: WeatherComponent},
  { path: 'user-detail-tasks/:id', component: UserDetailTasksComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
