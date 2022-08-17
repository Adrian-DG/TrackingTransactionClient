import { Component, OnInit } from '@angular/core';
import { ResolveStart, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/Interfaces/iaccount';
import { IDecodedToken } from 'src/app/Interfaces/idecoded-token';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilters } from 'src/app/Interfaces/ipagination-filters';
import { AccountService } from 'src/app/Services/Account/account.service';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';

// import { faEye } from '@fortawesome/free-solid-svg-icons';

import { Roles } from '../../../Enums/Roles.enum';

@Component({
	selector: 'app-account-list',
	templateUrl: './account-list.component.html',
	styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
	filters: IPaginationFilters = {
		page: 1,
		size: 10,
		searchTerm: '',
		status: true,
	};

	// icons = {
	// 	details: faEye,
	// };

	constructor(
		private _account: AccountService,
		private _auth: AuthServiceService,
		private $router: Router
	) {}

	accountInfo: Observable<IPagedData<IAccount>> = this._account.list$;

	ngOnInit(): void {
		this.getAccountInfo();
	}

	getAccountInfo() {
		this._auth.token$.subscribe((resp: IDecodedToken | null) => {
			if (resp) {
				parseInt(resp.role) == Roles.Administrator
					? this._account.GetAll(this.filters)
					: this._account.GetCustomerAccounts(
							this.filters,
							resp.nameid // userId
					  );
			}
		});
		// TODO: remember to unsuscribe observable
	}

	showAccountTransactions(id: Guid): void {
		this.$router.navigateByUrl(`accounts/${id}/transactions`);
	}
}
