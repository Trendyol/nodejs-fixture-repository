import { getRandomNumberBetween } from '../utils/getRandomNumberBetween';
import { IValueGenerator } from '../interfaces/valueGenerator';
import { ValueGeneratorBase } from './valueGeneratorBase';
import { Container } from '../../typeChecker';

export class ArrayValueGenerator implements IValueGenerator {
  base: ValueGeneratorBase;
  constructor(base: ValueGeneratorBase) {
    this.base = base;
  }

  public generate(type: string, container: Container) {
    const result: any[] = [];
    const baseType = type.split('[]')[0];
    const rnd = getRandomNumberBetween(1, 3);

    for (let index = 0; index < rnd; index++) {
      result.push(this.base.resolveAndGenerate(baseType));
    }

    return result;
  }
}
