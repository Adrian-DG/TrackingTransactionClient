import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(public _auth: AuthServiceService) {}

	ngOnInit(): void {}
}
