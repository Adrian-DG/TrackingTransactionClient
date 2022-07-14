import { Guid } from 'guid-typescript';
import { AccountType } from '../Enums/AccountType.enum';
import { IModelMetadata } from './imodel-metadata';

export interface IAccount extends IModelMetadata {
	description: string;
	type: AccountType;
	userId: string | null;
}
