import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private _auth: AuthServiceService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const bearerToken = this._auth.getToken();
		console.log(bearerToken);
		if (bearerToken != null) {
			request = request.clone({
				setHeaders: { Authorization: `Bearer ${bearerToken}` },
			});
		}

		return next.handle(request);
	}
}
