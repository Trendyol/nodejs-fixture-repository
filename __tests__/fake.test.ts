import { IPrimitives, INested } from './models/testModel';
import { Faker } from './../src/faker';
import path from 'path';

describe('Faker tests', () => {
  let faker: Faker;

  beforeAll(() => {
    faker = new Faker('**/*Model.ts');
  });

  it('should fake primitive types correctly', () => {
    const result: IPrimitives = faker.fake('IPrimitives');

    expect(typeof result.string).toBe('string');
    expect(typeof result.number).toBe('number');
    expect(typeof result.boolean).toBe('boolean');
    expect(result.null).toBeNull();
    expect(result.undefined).toBeUndefined();
  });

  it('should fake nested types correctly', () => {
    const result: INested = faker.fake('INested');

    expect(typeof result.string).toBe('string');
    expect(typeof result.primitives.string).toBe('string');
    expect(typeof result.primitives.number).toBe('number');
    expect(typeof result.primitives.boolean).toBe('boolean');
    expect(result.primitives.null).toBeNull();
    expect(result.primitives.undefined).toBeUndefined();
  });
});
