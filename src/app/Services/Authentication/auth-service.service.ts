import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ILoginResponse } from 'src/app/Interfaces/ilogin-response';
import { IServerResponse } from 'src/app/Interfaces/iserver-response';
import { IUserModel } from 'src/app/Interfaces/iuser-model';
import { environment as DevAPI } from '../../../environments/environment';
import { environment as ProdAPI } from '../../../environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class AuthServiceService {
	private endPoint: string = '';

	constructor(private $http: HttpClient) {
		this.endPoint += `${
			isDevMode() ? DevAPI.api_url : ProdAPI.api_url
		}/auth`;
	}

	register(model: IUserModel): void {
		this.$http
			.post<IServerResponse>(`${this.endPoint}/register`, model)
			.subscribe((resp: IServerResponse) => console.log(resp));
	}

	login(model: IUserModel): void {
		this.$http
			.post<ILoginResponse>(`${this.endPoint}/login`, model)
			.subscribe((resp: ILoginResponse) => console.log(resp));
	}
}
