import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroFormComponent }    from './forms/hero-form/hero-form.component';
import { HeroWithSidekickFormComponent } from './forms/hero-with-sidekick-form/hero-with-sidekick-form.component';
import { HeroMenuComponent }    from './hero-menu/hero-menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'heroform',  component: HeroWithSidekickFormComponent },
  { path: 'heromenu', component: HeroMenuComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
