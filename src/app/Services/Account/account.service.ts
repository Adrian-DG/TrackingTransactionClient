import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { IAccount } from 'src/app/Interfaces/iaccount';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilters } from 'src/app/Interfaces/ipagination-filters';
import { IServerResponse } from 'src/app/Interfaces/iserver-response';
import { GenericService } from '../Generic/generic.service';
import { JwtokenService } from '../JWToken/jwtoken.service';
import { ToastService } from '../Toast/toast.service';

@Injectable({
	providedIn: 'root',
})
export class AccountService extends GenericService<IAccount> {
	GetResourceUrl(): string {
		return 'accounts';
	}

	constructor(
		protected override $http: HttpClient,
		protected override _toast: ToastService,
		protected override _jwt: JwtokenService
	) {
		super($http, _toast, _jwt);
	}

	GetCustomerAccounts(filters: IPaginationFilters, userId: string): void {
		const queryParams = new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm)
			.set('status', filters.status);

		this.$http
			.get<IPagedData<IAccount>>(`${this.endPoint}/${userId}/all`, {
				params: queryParams,
			})
			.subscribe((resp: IPagedData<IAccount>) => {
				console.log(resp);
				this.listSource.next(resp);
			});
	}

	DeleteCustomerAccount(accountId: string): void {
		this.$http
			.delete<IServerResponse>(`${this.endPoint}/${accountId}`)
			.subscribe((resp: IServerResponse) => console.log(resp));
	}
}
