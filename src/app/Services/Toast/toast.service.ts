import { Injectable } from '@angular/core';
import { CreateHotToastRef, HotToastService } from '@ngneat/hot-toast';
import { IServerResponse } from 'src/app/Interfaces/iserver-response';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	toastStyles = {
		success: (message: string) => this._toast.success(message),
		error: (message: string) => this._toast.error(message),
		loading: (message: string) => this._toast.loading(message),
		info: (message: string) => this._toast.info(message),
		warning: (message: string) => this._toast.warning(message),
	};

	constructor(private _toast: HotToastService) {}
}
