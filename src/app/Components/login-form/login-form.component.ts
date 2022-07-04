import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService as AuthService } from 'src/app/Services/Authentication/auth-service.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(private _auth: AuthService, private $fb: FormBuilder) {}

	ngOnInit() {
		this.loginForm = this.$fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
	}

	login(): void {
		this._auth.login(this.loginForm.value);
	}
}
