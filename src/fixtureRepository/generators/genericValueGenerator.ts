import { IValueGenerator } from '../interfaces/valueGenerator';
import { ValueGeneratorBase } from './valueGeneratorBase';
import { Container } from '../../typeChecker';

export class GenericValueGenerator implements IValueGenerator {
  base: ValueGeneratorBase;
  constructor(base: ValueGeneratorBase) {
    this.base = base;
  }

  public generate(type: string, container: Container) {
    let result: any = {};
    let genericTypes: string[] = [];
    let genericValues: string[] = [];

    const baseType = container.find(item => item.name === type.split('<')[0]);
    const matches = type.match(/(?<=\<)(.*?)(?=\>)/g);

    if (baseType && matches && matches.length) {
      genericTypes = matches[0].split(',').map(type => type.trim());

      genericValues = genericTypes.map(item => this.base.resolveAndGenerate(item));
      result = this.base.resolveAndGenerate(baseType.name);

      Object.keys(result).forEach(key => {
        const index = baseType.typeParameters.findIndex(item => item === result[key]);

        if (index >= 0) {
          result[key] = genericValues[index];
        }
      });
    }

    return result;
  }
}
