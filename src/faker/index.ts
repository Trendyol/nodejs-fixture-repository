import glob from 'glob';
import { generateDocumentation, IType } from './typeChecker';
import { ValueGeneratorBase } from './generators/valueGeneratorBase';

export class Faker {
  private container: IType[] = [];
  private valueGenerator: ValueGeneratorBase;

  constructor(pattern: string) {
    const fileNames = this.getFileNames(pattern);
    this.container = generateDocumentation(fileNames, {});
    this.valueGenerator = new ValueGeneratorBase(this.container);

    this.fake = this.fake.bind(this);
  }

  public fake(type: string): any {
    return this.valueGenerator.generate(type);
  }

  private getFileNames(pattern: string): string[] {
    return glob.sync(pattern);
  }
}
