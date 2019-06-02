import { ValueGeneratorBase } from '../../src/fixtureRepository/generators/valueGeneratorBase';
import * as numberUtils from '../../src/fixtureRepository/utils/getRandomNumberBetween';
import { UnionValueGenerator } from '../../src/fixtureRepository/generators/unionValueGenerator';

const baseGenerator = {
  resolveAndGenerate: (type: string) => {}
} as ValueGeneratorBase;

describe('Union value generator tests', () => {
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
    const types = ['string', 'number'];

    numberSpy.mockReturnValue(0);
    baseSpy.mockReturnValue('test');

    const unionValueGenerator = new UnionValueGenerator(baseGenerator);
    const result = unionValueGenerator.generate(types.join('|'), []);

    expect(result).toBe('test');
    expect(baseSpy).toHaveBeenCalledWith('string');
    expect(numberSpy).toHaveBeenCalledWith(0, 2);
  });
});
