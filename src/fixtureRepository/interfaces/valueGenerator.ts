import { ValueGeneratorBase } from '../generators/valueGeneratorBase';
import { ContainerItem } from '../../typeChecker';

export interface IValueGenerator {
  base: ValueGeneratorBase;
  generate: (type: string, container: ContainerItem[]) => any;
}
