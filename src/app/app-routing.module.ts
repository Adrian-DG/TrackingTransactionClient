import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Guards/Authentication/authentication.guard';
import { HomeComponent } from './Pages/home/home.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';

import { TransactionContainerComponent } from './Pages/transaction-container/transaction-container.component';

const routes: Routes = [
	{
		path: 'accounts',
		component: MainPageComponent,
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'accounts/:id/transactions',
		component: TransactionContainerComponent,
	},
	{ path: 'auth', component: HomeComponent },
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
