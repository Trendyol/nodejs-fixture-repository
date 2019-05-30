import glob from 'glob';
import { ValueGeneratorBase } from './generators/valueGeneratorBase';
import { TypeChecker, ContainerItem, Container } from '../typeChecker';

export default class FixtureRepository {
  private static valueGenerator: ValueGeneratorBase;
  private static container: Container;

  public static setup(pattern: string) {
    const fileNames = glob.sync(pattern);

    const typeChecker = new TypeChecker(fileNames);

    this.container = typeChecker.generateContainer();
    this.valueGenerator = new ValueGeneratorBase(this.container);
  }

  public static create(type: string): any {
    return this.valueGenerator.resolveAndGenerate(type);
  }
}
