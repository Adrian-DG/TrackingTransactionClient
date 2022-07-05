import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { IDecodedToken } from 'src/app/Interfaces/idecoded-token';
import { IPaginationFilters } from 'src/app/Interfaces/ipagination-filters';
import { AccountService } from 'src/app/Services/Account/account.service';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';

@Component({
	selector: 'app-account-list',
	templateUrl: './account-list.component.html',
	styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
	userId!: string;
	filters: IPaginationFilters = {
		page: 1,
		size: 10,
		searchTerm: '',
		status: true,
	};

	constructor(
		private _account: AccountService,
		private _auth: AuthServiceService
	) {}

	ngOnInit(): void {
		this._auth.token$.subscribe((resp: IDecodedToken | null) => {
			if (resp) {
				this.userId = resp.nameid;
			}
		});

		this._account.GetCustomerAccounts(this.filters, this.userId);
	}
}
