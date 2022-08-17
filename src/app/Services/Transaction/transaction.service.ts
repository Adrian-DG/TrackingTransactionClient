import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilters } from 'src/app/Interfaces/ipagination-filters';
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

	GetAccountTransactionsAsync(
		filters: IPaginationFilters,
		accountId: string
	): void {
		const queryParams = new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm)
			.set('status', filters.status);

		this.$http
			.get<IPagedData<ITransaction>>(
				`${this.GetResourceUrl()}/${accountId}/all`,
				{ params: queryParams }
			)
			.subscribe((resp: IPagedData<ITransaction>) => {
				this.listSource.next(resp);
			});
	}
}
