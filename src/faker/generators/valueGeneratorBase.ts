import { IValueGenerator } from '../interfaces/valueGenerator';
import { IInterfaceParameter, IInterfaceType } from '../typeChecker';
import { TypeResolver } from './../resolvers/typeResolver';

export class ValueGeneratorBase {
  private container: IInterfaceType[];
  private typeResolver: TypeResolver;

  constructor(container: IInterfaceType[]) {
    this.container = container;
    this.typeResolver = new TypeResolver(this);

    this.generate = this.generate.bind(this);
    this.resolveAndGenerate = this.resolveAndGenerate.bind(this);
  }

  public generate(type: string) {
    let result = {};
    const interfaceType: IInterfaceType | undefined = this.container.find(item => item.name === type);

    if (interfaceType) {
      interfaceType.parameters.forEach((item: IInterfaceParameter) => {
        const type = item.type;
        const value = this.resolveAndGenerate(type);

        result = { ...result, [item.name]: value };
      });
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
