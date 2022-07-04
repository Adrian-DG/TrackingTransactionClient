import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Guards/Authentication/authentication.guard';
import { HomeComponent } from './Pages/home/home.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';

const routes: Routes = [
	{
		path: 'home',
		component: MainPageComponent,
		canActivate: [AuthenticationGuard],
	},
	{ path: 'auth', component: HomeComponent },
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
