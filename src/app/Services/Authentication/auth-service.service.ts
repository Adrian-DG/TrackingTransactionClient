import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';
import { ILoginResponse } from 'src/app/Interfaces/ilogin-response';
import { IServerResponse } from 'src/app/Interfaces/iserver-response';
import { IUserModel } from 'src/app/Interfaces/iuser-model';
import { environment as DevAPI } from '../../../environments/environment';
import { environment as ProdAPI } from '../../../environments/environment.prod';
import { ToastService } from '../Toast/toast.service';
import { JwtokenService } from '../JWToken/jwtoken.service';

import { Router } from '@angular/router';
import { IDecodedToken } from 'src/app/Interfaces/idecoded-token';

@Injectable({
	providedIn: 'root',
})
export class AuthServiceService {
	private endPoint: string = '';

	private isAuthenticatedSource: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	public isAuthenticated$: Observable<boolean> =
		this.isAuthenticatedSource.asObservable();

	private tokenSource: BehaviorSubject<IDecodedToken | null> =
		new BehaviorSubject<IDecodedToken | null>(null);
	public token$: Observable<IDecodedToken | null> =
		this.tokenSource.asObservable();

	constructor(
		private $http: HttpClient,
		private _toast: ToastService,
		private $router: Router,
		private _jwt: JwtokenService
	) {
		this.endPoint += `${
			isDevMode() ? DevAPI.api_url : ProdAPI.api_url
		}/auth`;
	}

	getTokenInfo(): Observable<IDecodedToken | null> {
		return this.token$;
	}

	// Get Token Information
	setTokenInfo(token: string): void {
		const tokenInfo: IDecodedToken = this._jwt.GetDecodedToken(token);
		this.tokenSource.next(tokenInfo);
	}

	checkIfAuthenticated(): void {
		const token: string | null = sessionStorage?.getItem('token');
		// check if token exists and token expiration
		if (token != null && !this._jwt.DidTokenExpire(token)) {
			this.isAuthenticatedSource.next(true);
			this.setTokenInfo(token);
		} else {
			this.isAuthenticatedSource.next(false);
		}
	}

	register(model: IUserModel): void {
		this.$http
			.post<IServerResponse>(`${this.endPoint}/register`, model)
			.subscribe((resp: IServerResponse) => {
				resp.status
					? this._toast.toastStyles.success(resp.message)
					: this._toast.toastStyles.error(resp.message);
			});
	}

	login(model: IUserModel): void {
		this.$http
			.post<ILoginResponse>(`${this.endPoint}/login`, model)
			.subscribe((resp: ILoginResponse) => {
				if (resp.status) {
					sessionStorage.setItem('token', resp.token);
					this.$router.navigate(['accounts']);
					this._toast.toastStyles.success(resp.message);
				} else {
					this._toast.toastStyles.error(resp.message);
				}
			});
	}

	logout(): void {
		sessionStorage.clear();
		this.$router.navigate(['']);
	}
}
