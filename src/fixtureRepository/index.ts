import glob from 'glob';
import { generateDocumentation, IType } from './checkers/typeChecker';
import { ValueGeneratorBase } from './generators/valueGeneratorBase';

export default class FixtureRepository {
  public static setup(pattern: string) {
    const fileNames = glob.sync(pattern);
    const container: IType[] = generateDocumentation(fileNames, {});
    const generator: ValueGeneratorBase = new ValueGeneratorBase(container);

    global.___container = container;
    global.___generator = generator;
  }

  public static create(type: string): any {
    return global.___generator.generate(type);
  }
}
