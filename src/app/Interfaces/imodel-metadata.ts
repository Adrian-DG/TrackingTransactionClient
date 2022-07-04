import { Guid } from 'guid-typescript';

export interface IModelMetadata {
	id: Guid;
	created: Date;
	modified: Date;
	status: boolean;
}
