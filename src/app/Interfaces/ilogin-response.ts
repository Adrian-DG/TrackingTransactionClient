import { IServerResponse } from './iserver-response';

export interface ILoginResponse extends IServerResponse {
	userId: string;
	token: string;
}
