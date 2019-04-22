import { ValueGeneratorBase } from './../generators/valueGeneratorBase';

export interface IValueGenerator {
  base: ValueGeneratorBase;
  generate: (type: string) => any;
}
