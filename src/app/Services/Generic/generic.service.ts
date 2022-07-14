import { Injectable, isDevMode } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment as ProdAPI } from '../../../environments/environment.prod';
import { environment as DevAPI } from '../../../environments/environment';

import { ToastService } from '../Toast/toast.service';
import { JwtokenService } from '../JWToken/jwtoken.service';
import { IPaginationFilters } from 'src/app/Interfaces/ipagination-filters';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { Guid } from 'guid-typescript';
import { IServerResponse } from 'src/app/Interfaces/iserver-response';
import { AsyncSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService<T> {
	protected readonly endPoint: string = '';
	abstract GetResourceUrl(): string;

	protected currentSubjectSource = new Subject<T>();
	public $currentSubject = this.currentSubjectSource.asObservable();
	protected listSource = new ReplaySubject<IPagedData<T>>();
	public list$ = this.listSource.asObservable();

	constructor(
		protected $http: HttpClient,
		protected _toast: ToastService,
		protected _jwt: JwtokenService
	) {
		this.endPoint += `${
			isDevMode() ? DevAPI.api_url : ProdAPI.api_url
		}/${this.GetResourceUrl()}`;
	}

	protected GenerateToast(status: boolean, message: string): void {
		status
			? this._toast.toastStyles.success(message)
			: this._toast.toastStyles.error(message);
	}

	GetAll(filters: IPaginationFilters): void {
		const queryParams = new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm)
			.set('status', filters.status);

		this.$http
			.get<IPagedData<T>>(this.endPoint, { params: queryParams })
			.subscribe((resp: IPagedData<T>) => {
				this.listSource.next(resp);
			});
	}

	GetById(id: Guid): void {
		this.$http
			.get<T>(`${this.endPoint}/${id}`)
			.subscribe((resp: T) => this.currentSubjectSource.next(resp));
	}

	Post(model: T): void {
		this.$http
			.post<IServerResponse>(this.endPoint, model)
			.subscribe((resp: IServerResponse) =>
				this.GenerateToast(resp.status, resp.message)
			);
	}

	Put(model: T): void {
		this.$http
			.put<IServerResponse>(this.endPoint, model)
			.subscribe((resp: IServerResponse) =>
				this.GenerateToast(resp.status, resp.message)
			);
	}

	Delete(id: Guid): void {
		this.$http
			.delete<IServerResponse>(`${this.endPoint}/${id}`)
			.subscribe((resp: IServerResponse) =>
				this.GenerateToast(resp.status, resp.message)
			);
	}
}
