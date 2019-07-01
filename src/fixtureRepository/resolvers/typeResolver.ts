import { IValueGenerator } from '../interfaces/valueGenerator';
import { ArrayValueGenerator } from '../generators/arrayValueGenerator';
import { PrimitiveValueGenerator } from '../generators/primitiveValueGenerator';
import { UnionValueGenerator } from '../generators/unionValueGenerator';
import { isUnion, isPrimitive, isArray, isGeneric } from '../utils/typeUtils';
import { ValueGeneratorBase } from '../generators/valueGeneratorBase';
import { GenericValueGenerator } from '../generators/genericValueGenerator';

export class TypeResolver {
  private arrayGenerator: ArrayValueGenerator;
  private primitiveGenerator: PrimitiveValueGenerator;
  private unionGenerator: UnionValueGenerator;
  private genericGenerator: GenericValueGenerator;

  constructor(baseValueGenerator: ValueGeneratorBase) {
    this.arrayGenerator = new ArrayValueGenerator(baseValueGenerator);
    this.primitiveGenerator = new PrimitiveValueGenerator(baseValueGenerator);
    this.unionGenerator = new UnionValueGenerator(baseValueGenerator);
    this.genericGenerator = new GenericValueGenerator(baseValueGenerator);

    this.getGenerator = this.getGenerator.bind(this);
    this.resolve = this.resolve.bind(this);
  }

  private getGenerator(type: string): IValueGenerator | undefined {
    let generator: IValueGenerator | undefined;
    if (isUnion(type) && !isGeneric(type)) {
      generator = this.unionGenerator;
    } else if (isPrimitive(type) && !isGeneric(type)) {
      generator = this.primitiveGenerator;
    } else if (isArray(type) && !isGeneric(type)) {
      generator = this.arrayGenerator;
    } else if (isGeneric(type)) {
      generator = this.genericGenerator;
    }

    return generator;
  }

  public resolve(type: string): IValueGenerator | undefined {
    return this.getGenerator(type);
  }
}
