import { ValueGeneratorBase } from './valueGeneratorBase';
import { getRandomNumberBetween } from '../utils/getRandomNumberBetween';
import { IValueGenerator } from '../interfaces/valueGenerator';
import { Container } from '../../typeChecker';

export class UnionValueGenerator implements IValueGenerator {
  base: ValueGeneratorBase;

  constructor(base: ValueGeneratorBase) {
    this.base = base;
  }

  public generate(type: string, container: Container) {
    const unionParts = type.split('|');
    const selectedUnionIndex = getRandomNumberBetween(0, unionParts.length);

    const selectedUnionType = unionParts[selectedUnionIndex].trim();

    return this.base.resolveAndGenerate(selectedUnionType);
  }
}
