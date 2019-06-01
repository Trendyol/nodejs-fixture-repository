import { IValueGenerator } from '../interfaces/valueGenerator';
import { TypeResolver } from '../resolvers/typeResolver';
import { getRandomNumberBetween } from '../utils/getRandomNumberBetween';
import { ContainerItem, Declaration, Property, Container } from '../../typeChecker';

export class ValueGeneratorBase {
  private container: Container;
  private typeResolver: TypeResolver;

  constructor(container: Container) {
    this.container = container;
    this.typeResolver = new TypeResolver(this);

    this.generate = this.generate.bind(this);
    this.resolveAndGenerate = this.resolveAndGenerate.bind(this);
  }

  public generate(type: string) {
    let result = {};
    const declaration: ContainerItem | undefined = this.container.find(item => item.name === type);

    if (declaration) {
      if (declaration.type === Declaration.Interface) {
        declaration.properties.forEach((item: Property) => {
          const value = item.isGeneric ? item.type : this.resolveAndGenerate(item.type);
          result = { ...result, [item.name]: value };
        });
      } else {
        const rnd = getRandomNumberBetween(0, declaration.properties.length);
        result = declaration.properties[rnd].value;
      }
    } else {
      result = this.resolveAndGenerate(type);
    }

    return result;
  }

  public resolveAndGenerate(type: string) {
    const generator: IValueGenerator | undefined = this.typeResolver.resolve(type);

    if (generator) {
      return generator.generate(type, this.container);
    }

    return this.generate(type);
  }
}
