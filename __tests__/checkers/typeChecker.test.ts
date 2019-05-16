import { TypeChecker, Container, Declaration } from '../../src/typeChecker';
import glob from 'glob';

let files: string[] = [];
describe('type cheker tests', () => {
  beforeAll(() => {});

  it('should create a type cheker', () => {
    const typeChecker = new TypeChecker([]);

    expect(typeChecker).toBeDefined();
  });

  it('should create interface properties correctly', () => {
    const expectedProperties = [
      {
        name: 'string',
        type: 'string'
      },
      {
        name: 'number',
        type: 'number'
      },
      {
        name: 'boolean',
        type: 'boolean'
      },
      {
        name: 'null',
        type: 'null'
      },
      {
        name: 'undefined',
        type: 'undefined'
      }
    ];

    files = glob.sync('*/*/interfaceModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('Primitives');
    expect(result.items[0].type).toBe(Declaration.Interface);
    expect(result.items[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly when extends', () => {
    const expectedProperties = [
      {
        name: 'someProperty',
        type: 'string'
      },
      {
        name: 'string',
        type: 'string'
      },
      {
        name: 'number',
        type: 'number'
      },
      {
        name: 'boolean',
        type: 'boolean'
      },
      {
        name: 'null',
        type: 'null'
      },
      {
        name: 'undefined',
        type: 'undefined'
      }
    ];

    files = glob.sync('*/*/extendsInterfaceModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('ExtendsPrimitives');
    expect(result.items[0].type).toBe(Declaration.Interface);
    expect(result.items[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly when extends', () => {
    const expectedProperties = [
      {
        name: 'primitives',
        type: 'Primitives'
      }
    ];

    files = glob.sync('*/*/interfaceWithAnotherInterfaceModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('WithAnotherInterface');
    expect(result.items[0].type).toBe(Declaration.Interface);
    expect(result.items[0].properties).toEqual(expectedProperties);
  });
});
