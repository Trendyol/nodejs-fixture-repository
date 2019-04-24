import { IPrimitives, INested, IArrayType, IUnion, IEnumType, Enum1, Enum2 } from './models/testModel';
import fr from '../src/fixtureRepository';
import { isArray } from 'util';

describe('Faker tests', () => {
  beforeAll(() => {
    fr.setup('**/*Model.ts');
  });

  it('should fake primitive types correctly', () => {
    const result: IPrimitives = fr.create('IPrimitives');

    expect(typeof result.string).toBe('string');
    expect(typeof result.number).toBe('number');
    expect(typeof result.boolean).toBe('boolean');
    expect(result.null).toBeNull();
    expect(result.undefined).toBeUndefined();
  });

  it('should fake nested types correctly', () => {
    const result: INested = fr.create('INested');

    expect(typeof result.string).toBe('string');
    expect(typeof result.primitives.string).toBe('string');
    expect(typeof result.primitives.number).toBe('number');
    expect(typeof result.primitives.boolean).toBe('boolean');
    expect(result.primitives.null).toBeNull();
    expect(result.primitives.undefined).toBeUndefined();
  });

  it('should fake array types correctly', () => {
    const result: IArrayType = fr.create('IArrayType');

    expect(isArray(result.stringArray)).toBeTruthy();
    expect(isArray(result.nestedArray)).toBeTruthy();
    expect(result.stringArray.length).toBeGreaterThan(0);
    expect(result.nestedArray.length).toBeGreaterThan(0);
  });

  it('should fake union types correctly', () => {
    const result: IUnion = fr.create('IUnion');

    expect(typeof result.union).toMatch(/(string|number|boolean)/g);
    expect(typeof result.nestedUnion).toMatch(/(object|boolean)/g);
  });

  it('should fake enum types correctly', () => {
    const result: Enum1 = fr.create('Enum1');

    expect(result).toBeDefined();
    expect(Object.values(Enum1)).toContain(result);
  });

  it('should fake types with enums correctly', () => {
    const result: IEnumType = fr.create('IEnumType');

    expect(result.enum1).toBeDefined();
    expect(result.enum2).toBeDefined();
    expect(Object.values(Enum1)).toContain(result.enum1);
    expect(Object.values(Enum2)).toContain(result.enum2);
  });
});