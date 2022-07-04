import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
	constructor(private _auth: AuthServiceService) {
		_auth.checkIfAuthenticated();
	}

	canActivate(): boolean {
		let isAuthenticated = false;
		this._auth.isAuthenticated$.subscribe(
			(data: boolean) => (isAuthenticated = data)
		);
		return isAuthenticated;
	}
}
