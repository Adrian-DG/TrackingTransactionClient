import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService as AuthService } from 'src/app/Services/Authentication/auth-service.service';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
	registerForm!: FormGroup;

	constructor(private _auth: AuthService, private $fb: FormBuilder) {}

	ngOnInit(): void {
		this.registerForm = this.$fb.group({
			username: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(8),
				],
			],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(6),
					Validators.maxLength(8),
				],
			],
		});
	}

	registerUser(): void {
		console.log(this.registerForm.valid);
		this._auth.register(this.registerForm.value);
	}
}
