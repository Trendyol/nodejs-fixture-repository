import { ValueGeneratorBase } from '../../src/fixtureRepository/generators/valueGeneratorBase';
import { ArrayValueGenerator } from '../../src/fixtureRepository/generators/arrayValueGenerator';
import * as numberUtils from '../../src/fixtureRepository/utils/getRandomNumberBetween';

const baseGenerator = {
  resolveAndGenerate: (type: string) => {}
} as ValueGeneratorBase;

describe('Array value generator tests', () => {
  let baseSpy: jest.SpyInstance;
  let numberSpy: jest.SpyInstance;

  beforeEach(() => {
    baseSpy = jest.spyOn(baseGenerator, 'resolveAndGenerate');
    numberSpy = jest.spyOn(numberUtils, 'getRandomNumberBetween');
  });

  afterEach(() => {
    baseSpy.mockReset();
    numberSpy.mockReset();
  });

  it('should return length greater than 0', () => {
    numberSpy.mockReturnValue(1);
    baseSpy.mockReturnValue('test');

    const arrayValueGenerator = new ArrayValueGenerator(baseGenerator);
    const result = arrayValueGenerator.generate('testType[]', []);

    expect(result.length).toBe(1);
    expect(result[0]).toBe('test');
    expect(baseSpy).toHaveBeenCalledWith('testType');
    expect(numberSpy).toHaveBeenCalledWith(1, 3);
  });
});
