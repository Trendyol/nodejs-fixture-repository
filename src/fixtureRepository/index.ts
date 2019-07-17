import glob from 'fast-glob';
import { ValueGeneratorBase } from './generators/valueGeneratorBase';
import { TypeChecker, Container } from '../typeChecker';

export interface FrOptions {
  ignoreGlob?: string[];
  additionalFiles?: string[];
}

const defaultOptions = {
  ignoreGlob: [],
  additionalFiles: []
};

export default class FixtureRepository {
  private static valueGenerator: ValueGeneratorBase;
  private static container: Container;

  public static setup(pattern: string, options: FrOptions = defaultOptions) {
    const additionalFiles = options.additionalFiles || defaultOptions.additionalFiles;

    let fileNames = glob.sync(pattern, this.getOptions(options));
    fileNames = fileNames.concat(additionalFiles);

    const typeChecker = new TypeChecker(fileNames);

    this.container = typeChecker.generateContainer();
    this.valueGenerator = new ValueGeneratorBase(this.container);
  }

  public static create(type: string): any {
    return this.valueGenerator.resolveAndGenerate(type);
  }

  private static getOptions(options: FrOptions) {
    return {
      onlyFiles: true,
      unique: true,
      ignore: options.ignoreGlob || defaultOptions.ignoreGlob
    };
  }
}
