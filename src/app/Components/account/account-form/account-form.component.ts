import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { IAccount } from 'src/app/Interfaces/iaccount';
import { IDecodedToken } from 'src/app/Interfaces/idecoded-token';
import { AccountService } from 'src/app/Services/Account/account.service';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';
import { AccountType } from '../../../Enums/AccountType.enum';
@Component({
	selector: 'app-account-form',
	templateUrl: './account-form.component.html',
	styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
	accountForm!: FormGroup;
	public accountTypes = AccountType;

	constructor(
		private $fb: FormBuilder,
		private _account: AccountService,
		private _auth: AuthServiceService
	) {}

	ngOnInit(): void {
		this.accountForm = this.$fb.group({
			description: ['', [Validators.required]],
			type: [0],
		});
	}

	createAccount(): void {
		const accountInfo: IAccount = this.accountForm.value;
		accountInfo.type = parseInt(accountInfo.type.toString());
		this._auth.getTokenInfo().subscribe((resp: IDecodedToken | null) => {
			accountInfo.userId = resp ? resp.nameid : null;
		});

		this._account.Post(accountInfo);
	}
}
