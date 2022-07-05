import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from 'src/app/Interfaces/itransaction';
import { GenericService } from '../Generic/generic.service';
import { JwtokenService } from '../JWToken/jwtoken.service';
import { ToastService } from '../Toast/toast.service';

@Injectable({
	providedIn: 'root',
})
export class TransactionService extends GenericService<ITransaction> {
	GetResourceUrl(): string {
		return 'transactions';
	}

	constructor(
		protected override $http: HttpClient,
		protected override _toast: ToastService,
		protected override _jwt: JwtokenService
	) {
		super($http, _toast, _jwt);
	}
}
