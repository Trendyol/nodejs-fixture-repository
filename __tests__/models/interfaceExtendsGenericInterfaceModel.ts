import { GenericModel } from './genericInterfaceModel';

export interface ExtendsGenericInterface extends GenericModel<string> {
  string: string;
}
