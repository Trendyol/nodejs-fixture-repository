import { IPrimitives } from './interfaces';
import { fake } from './../src/fake';

describe('Faker tests', () => {
  it('should fake primitive types correctly', () => {
    fake();

    // expect(primitives.string).toBeInstanceOf(String);
    // expect(primitives.number).toBeInstanceOf(Number);
    // expect(primitives.boolean).toBeInstanceOf(Boolean);
    // expect(primitives.null).toBeInstanceOf(null);
    // expect(primitives.undefined).toBeInstanceOf(undefined);
  });
});
