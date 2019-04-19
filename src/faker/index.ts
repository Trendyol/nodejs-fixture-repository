import glob from 'glob';
import faker from 'faker';
import { generateDocumentation, IInterfaceType } from './typeChecker';

enum PrimitiveType {
  Number = 'number',
  Boolean = 'boolean',
  String = 'string',
  Null = 'null',
  Undefined = 'undefined'
}

type Primitive = null | string | undefined | number | boolean;

export class Faker {
  private container: IInterfaceType[] = [];

  constructor(pattern: string) {
    const fileNames = this.getFileNames(pattern);
    this.container = generateDocumentation(fileNames, {});

    this.fake = this.fake.bind(this);
  }

  public fake(type: string): any {
    return this.generateValuesForType(type);
  }

  private getFileNames(pattern: string): string[] {
    return glob.sync(pattern);
  }

  private generateValuesForType(interfaceName: string): any {
    let result = {};
    const interfaceType: IInterfaceType | undefined = this.container.find(
      item => item.name === interfaceName
    );

    if (interfaceType) {
      interfaceType.parameters.forEach(item => {
        const type = item.type;
        const value = this.getValueForType(type);

        result = { ...result, [item.name]: value };
      });
    }

    return result;
  }

  private getValueForType(type: string): any {
    let value: any;
    if (this.isPrimitiveType(type)) {
      value = this.generatePrimitiveTypeValue(type);
    } else if (this.isArrayType(type)) {
      value = this.generateValuesForArrayType(type);
    } else {
      value = this.generateValuesForType(type);
    }

    return value;
  }

  private isArrayType(type: string): boolean {
    return type.indexOf('[]') > -1;
  }

  private generateValuesForArrayType(type: string): any[] {
    const result: any[] = [];
    const baseType = type.split('[]')[0];
    const rnd = Math.floor(Math.random() * 3) + 1;

    for (let index = 0; index < rnd; index++) {
      result.push(this.getValueForType(baseType));
    }

    return result;
  }

  private isPrimitiveType(type: string): boolean {
    const typeToCheck = type.toLowerCase();
    return (
      typeToCheck === PrimitiveType.Boolean ||
      typeToCheck === PrimitiveType.String ||
      typeToCheck === PrimitiveType.Null ||
      typeToCheck === PrimitiveType.Number ||
      typeToCheck === PrimitiveType.Undefined
    );
  }

  private generatePrimitiveTypeValue(type: string): Primitive {
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
