import { ValueGeneratorBase } from './valueGeneratorBase';
import faker from 'faker';
import { IValueGenerator } from '../interfaces/valueGenerator';

export enum PrimitiveType {
  Number = 'number',
  Boolean = 'boolean',
  String = 'string',
  Null = 'null',
  Undefined = 'undefined'
}

type Primitive = null | string | undefined | number | boolean;

export class PrimitiveValueGenerator implements IValueGenerator {
  base: ValueGeneratorBase;

  constructor(base: ValueGeneratorBase) {
    this.base = base;
  }

  public generate(type: string): Primitive {
    switch (type) {
      case PrimitiveType.Boolean:
        return faker.random.boolean();
      case PrimitiveType.String:
        const words = faker.random.word();
        return words.split(' ')[0];
      case PrimitiveType.Number:
        return faker.random.number();
      case PrimitiveType.Null:
        return null;
      case PrimitiveType.Undefined:
        return undefined;
      default:
        return undefined;
    }
  }
}
