import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/Services/Transaction/transaction.service';
import { ITransaction } from 'src/app/Interfaces/itransaction';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
	selector: 'app-transactions-form',
	templateUrl: './transactions-form.component.html',
	styleUrls: ['./transactions-form.component.scss'],
})
export class TransactionsFormComponent implements OnInit {
	transactionForm!: FormGroup;

	constructor(
		private _trasaction: TransactionService,
		private $fb: FormBuilder,
		private $route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.transactionForm = this.$fb.group({
			concept: ['', [Validators.required]],
			description: [''],
			amount: [0, [Validators.required]],
			accountId: [0],
		});
	}

	getRouteParameters(): string {
		const id: string | null = this.$route.snapshot.paramMap.get('id');
		return id ? id : '';
	}

	resetForm(): void {
		this.transactionForm.reset();
	}

	saveTrasaction(): void {
		const trasaction: ITransaction = this.transactionForm.value;
		trasaction.accountId = this.getRouteParameters();
		console.log(trasaction);
		this._trasaction.Post(trasaction);
		this.resetForm();
	}
}
