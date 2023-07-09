import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TranslationComponent } from './translation/translation.component';
import { ProjektPaketeComponent } from './projekt-pakete/projekt-pakete.component';
import { WetterComponent } from './wetter/wetter.component';

const routes: Routes = [
  { path: '', component: WetterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'translation', component: TranslationComponent },
  { path: 'projekt-pakete', component: ProjektPaketeComponent },
  { path: 'wetter', component: WetterComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
