import { IValueGenerator } from '../interfaces/valueGenerator';
import { IParameter, IType, Type } from '../typeChecker';
import { TypeResolver } from './../resolvers/typeResolver';
import { getRandomNumberBetween } from '../utils/getRandomNumberBetween';

export class ValueGeneratorBase {
  private container: IType[];
  private typeResolver: TypeResolver;

  constructor(container: IType[]) {
    this.container = container;
    this.typeResolver = new TypeResolver(this);

    this.generate = this.generate.bind(this);
    this.resolveAndGenerate = this.resolveAndGenerate.bind(this);
  }

  public generate(type: string) {
    let result = {};
    const interfaceType: IType | undefined = this.container.find(item => item.name === type);

    if (interfaceType) {
      if (interfaceType.type === Type.Interface) {
        interfaceType.parameters.forEach((item: IParameter) => {
          const type = item.type;
          const value = this.resolveAndGenerate(type);

          result = { ...result, [item.name]: value };
        });
      } else {
        const rnd = getRandomNumberBetween(0, interfaceType.parameters.length);
        result = interfaceType.parameters[rnd].value;
      }
    }

    return result;
  }

  public resolveAndGenerate(type: string) {
    const generator: IValueGenerator | undefined = this.typeResolver.resolve(type);

    if (generator) {
      return generator.generate(type);
    }

    return this.generate(type);
  }
}
