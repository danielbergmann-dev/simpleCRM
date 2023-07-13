import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TranslationComponent } from './translation/translation.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { WetterComponent } from './wetter/wetter.component';
import { RainComponent } from './rain/rain.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
  { path: '', component: WetterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'translation', component: TranslationComponent },
  { path: 'delivery', component: DeliveryComponent },
  
  { path: 'wetter', component: WetterComponent },
  { path: 'rain', component: RainComponent },
  { path: 'car', component: CarComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
