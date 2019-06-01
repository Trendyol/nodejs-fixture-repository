import { ValueGeneratorBase } from '../../src/fixtureRepository/generators/valueGeneratorBase';
import { PrimitiveValueGenerator } from '../../src/fixtureRepository/generators/primitiveValueGenerator';

const baseGenerator = {} as ValueGeneratorBase;

describe('Primitive value generator tests', () => {
  it('should return boolean', () => {
    const primitiveValueGenerator = new PrimitiveValueGenerator(baseGenerator);
    const result = primitiveValueGenerator.generate('boolean', []);

    expect(typeof result).toBe('boolean');
  });

  it('should return string', () => {
    const primitiveValueGenerator = new PrimitiveValueGenerator(baseGenerator);
    const result = primitiveValueGenerator.generate('string', []);

    expect(typeof result).toBe('string');
  });

  it('should return number', () => {
    const primitiveValueGenerator = new PrimitiveValueGenerator(baseGenerator);
    const result = primitiveValueGenerator.generate('number', []);

    expect(typeof result).toBe('number');
  });

  it('should return null', () => {
    const primitiveValueGenerator = new PrimitiveValueGenerator(baseGenerator);
    const result = primitiveValueGenerator.generate('null', []);

    expect(result).toBeNull();
  });

  it('should return undefined', () => {
    const primitiveValueGenerator = new PrimitiveValueGenerator(baseGenerator);
    const result = primitiveValueGenerator.generate('undefined', []);

    expect(result).toBeUndefined();
  });

  it('should return default undefined', () => {
    const primitiveValueGenerator = new PrimitiveValueGenerator(baseGenerator);
    const result = primitiveValueGenerator.generate('randomText', []);

    expect(result).toBeUndefined();
  });
});
