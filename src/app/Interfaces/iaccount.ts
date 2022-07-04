import { Guid } from 'guid-typescript';
import { IModelMetadata } from './imodel-metadata';

export interface IAccount extends IModelMetadata {
	userId: Guid;
}
