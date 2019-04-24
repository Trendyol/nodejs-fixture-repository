import { IValueGenerator } from '../interfaces/valueGenerator';
import { ArrayValueGenerator } from '../generators/arrayValueGenerator';
import { PrimitiveValueGenerator } from '../generators/primitiveValueGenerator';
import { UnionValueGenerator } from '../generators/unionValueGenerator';
import { isUnion, isPrimitive, isArray } from '../utils/typeUtils';
import { ValueGeneratorBase } from '../generators/valueGeneratorBase';

export class TypeResolver {
  private arrayGenerator: ArrayValueGenerator;
  private primitiveGenerator: PrimitiveValueGenerator;
  private unionGenerator: UnionValueGenerator;

  constructor(baseValueGenerator: ValueGeneratorBase) {
    this.arrayGenerator = new ArrayValueGenerator(baseValueGenerator);
    this.primitiveGenerator = new PrimitiveValueGenerator(baseValueGenerator);
    this.unionGenerator = new UnionValueGenerator(baseValueGenerator);

    this.getGenerator = this.getGenerator.bind(this);
    this.resolve = this.resolve.bind(this);
  }

  private getGenerator(type: string): IValueGenerator | undefined {
    let generator: IValueGenerator | undefined;

    if (isUnion(type)) {
      generator = this.unionGenerator;
    } else if (isPrimitive(type)) {
      generator = this.primitiveGenerator;
    } else if (isArray(type)) {
      generator = this.arrayGenerator;
    }

    return generator;
  }

  public resolve(type: string): IValueGenerator | undefined {
    return this.getGenerator(type);
  }
}
