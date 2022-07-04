import { Guid } from 'guid-typescript';
import { IModelMetadata } from './imodel-metadata';

export interface ITransaction extends IModelMetadata {
	concept: string;
	description: string;
	amount: number;
	accountId: Guid;
}
