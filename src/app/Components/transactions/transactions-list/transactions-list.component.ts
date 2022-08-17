import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilters } from 'src/app/Interfaces/ipagination-filters';
import { ITransaction } from 'src/app/Interfaces/itransaction';
import { TransactionService } from 'src/app/Services/Transaction/transaction.service';

@Component({
	selector: 'app-transactions-list',
	templateUrl: './transactions-list.component.html',
	styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
	filters: IPaginationFilters = {
		page: 1,
		size: 10,
		searchTerm: '',
		status: true,
	};

	constructor(
		private _transactions: TransactionService,
		private $route: ActivatedRoute
	) {}

	accountTransactionList: Observable<IPagedData<ITransaction>> =
		this._transactions.list$;

	ngOnInit(): void {
		this.GetAccountTransactionsAsync();
	}

	GetAccountTransactionsAsync(): void {
		const accountId: string | null =
			this.$route.snapshot.paramMap.get('id');
		if (accountId != null)
			this._transactions.GetAccountTransactionsAsync(
				this.filters,
				accountId
			);
	}
}
