import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';

import { HomeComponent } from './Pages/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { TransactionsFormComponent } from './Components/transactions/transactions-form/transactions-form.component';
import { TransactionsListComponent } from './Components/transactions/transactions-list/transactions-list.component';
import { AccountListComponent } from './Components/account/account-list/account-list.component';
import { AccountFormComponent } from './Components/account/account-form/account-form.component';
import { JwtInterceptor } from './Interceptors/Jwt/jwt.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		RegisterFormComponent,
		LoginFormComponent,
		MainPageComponent,
		TransactionsFormComponent,
		TransactionsListComponent,
		AccountListComponent,
		AccountFormComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HotToastModule.forRoot({
			reverseOrder: true,
			dismissible: false,
			autoClose: true,
			duration: 3000,
			position: 'bottom-right',
		}),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
