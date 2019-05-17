import { GenericModel } from './genericInterfaceModel';

export interface ExtendsGenericInterface extends GenericModel<number> {
  string: string;
}
