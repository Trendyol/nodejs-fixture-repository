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
        type: 'string',
        isGeneric: false
      },
      {
        name: 'number',
        type: 'number',
        isGeneric: false
      },
      {
        name: 'boolean',
        type: 'boolean',
        isGeneric: false
      },
      {
        name: 'null',
        type: 'null',
        isGeneric: false
      },
      {
        name: 'undefined',
        type: 'undefined',
        isGeneric: false
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
        type: 'string',
        isGeneric: false
      },
      {
        name: 'string',
        type: 'string',
        isGeneric: false
      },
      {
        name: 'number',
        type: 'number',
        isGeneric: false
      },
      {
        name: 'boolean',
        type: 'boolean',
        isGeneric: false
      },
      {
        name: 'null',
        type: 'null',
        isGeneric: false
      },
      {
        name: 'undefined',
        type: 'undefined',
        isGeneric: false
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

  it('should create interface properties correctly with custom interface properties', () => {
    const expectedProperties = [
      {
        name: 'primitives',
        type: 'Primitives',
        isGeneric: false
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

  it('should create interface properties correctly with array properties', () => {
    const expectedProperties = [
      {
        name: 'stringArray',
        type: 'string[]',
        isGeneric: false
      },
      {
        name: 'primitivesArray',
        type: 'Primitives[]',
        isGeneric: false
      }
    ];

    files = glob.sync('*/*/interfaceWithArrayPropertiesModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('ArrayProperties');
    expect(result.items[0].type).toBe(Declaration.Interface);
    expect(result.items[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly with generic signature', () => {
    const expectedProperties = [
      {
        name: 'model',
        type: 'T',
        isGeneric: true
      }
    ];

    files = glob.sync('*/*/genericInterfaceModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('GenericModel');
    expect(result.items[0].type).toBe(Declaration.Interface);
    expect(result.items[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly with generic signature', () => {
    const expectedProperties = [
      {
        name: 'string',
        type: 'string',
        isGeneric: false
      },
      {
        name: 'model',
        type: 'number',
        isGeneric: true
      }
    ];

    files = glob.sync('*/*/interfaceExtendsGenericInterfaceModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('ExtendsGenericInterface');
    expect(result.items[0].type).toBe(Declaration.Interface);
    expect(result.items[0].properties).toEqual(expectedProperties);
  });
});
