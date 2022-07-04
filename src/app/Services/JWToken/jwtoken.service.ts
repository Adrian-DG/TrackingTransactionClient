import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IDecodedToken } from 'src/app/Interfaces/idecoded-token';

@Injectable({
	providedIn: 'root',
})
export class JwtokenService {
	private helper!: JwtHelperService;

	constructor() {
		this.helper = new JwtHelperService();
	}

	DidTokenExpire(token: string): boolean {
		return this.helper.isTokenExpired(token);
	}

	GetDecodedToken(token: string): IDecodedToken {
		return this.helper.decodeToken<IDecodedToken>(token);
	}
}
