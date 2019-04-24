import glob from 'glob';
import { generateDocumentation, IType } from './checkers/typeChecker';
import { ValueGeneratorBase } from './generators/valueGeneratorBase';

export default class FixtureRepository {
  private static container: IType[] = [];
  private static valueGenerator: ValueGeneratorBase;

  public static setup(pattern: string) {
    const fileNames = glob.sync(pattern);

    this.container = generateDocumentation(fileNames, {});
    this.valueGenerator = new ValueGeneratorBase(this.container);
  }

  public static create(type: string): any {
    return this.valueGenerator.generate(type);
  }
}
