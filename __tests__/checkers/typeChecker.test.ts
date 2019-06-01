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

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Primitives');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
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

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('ExtendsPrimitives');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
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

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('WithAnotherInterface');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
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

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('ArrayProperties');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly with generic signature', () => {
    const expectedProperties = [
      {
        name: 'model0',
        type: 'boolean',
        isGeneric: false
      },
      {
        name: 'model1',
        type: 'T',
        isGeneric: true
      },
      {
        name: 'model2',
        type: 'P',
        isGeneric: true
      }
    ];

    files = glob.sync('*/*/genericInterfaceModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('GenericModel');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(2);
    expect(result[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly with generic signature', () => {
    const expectedProperties = [
      {
        name: 'string',
        type: 'string',
        isGeneric: false
      },
      {
        name: 'model0',
        type: 'boolean',
        isGeneric: false
      },
      {
        name: 'model1',
        type: 'number',
        isGeneric: true
      },
      {
        name: 'model2',
        type: 'string',
        isGeneric: true
      }
    ];

    files = glob.sync('*/*/interfaceExtendsGenericInterfaceModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('ExtendsGenericInterface');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly with union properties', () => {
    const expectedProperties = [
      {
        name: 'union',
        type: 'string | number',
        isGeneric: false
      },
      {
        name: 'union2',
        type: 'Primitives | ArrayProperties',
        isGeneric: false
      },
      {
        name: 'union3',
        type: 'string | boolean | Primitives',
        isGeneric: false
      }
    ];

    files = glob.sync('*/*/interfaceWithUnionProperties.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('WithUnionProperties');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
  });

  it('should create interface properties correctly with intersect properties', () => {
    const expectedProperties = [
      {
        name: 'union',
        type: 'string & number',
        isGeneric: false
      },
      {
        name: 'union2',
        type: 'Primitives & ArrayProperties',
        isGeneric: false
      },
      {
        name: 'union3',
        type: 'string & boolean & Primitives',
        isGeneric: false
      }
    ];

    files = glob.sync('*/*/interfaceWithIntersectProperties.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('WithIntersectProperties');
    expect(result[0].type).toBe(Declaration.Interface);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
  });

  it('should create enum values correctly', () => {
    const expectedProperties = [
      {
        name: 'First',
        type: 'Number',
        isGeneric: false,
        value: 0
      },
      {
        name: 'Second',
        type: 'Number',
        isGeneric: false,
        value: 1
      },
      {
        name: 'Third',
        type: 'String',
        isGeneric: false,
        value: 'third'
      }
    ];

    files = glob.sync('*/*/enumModel.ts');

    const typeChecker = new TypeChecker(files);

    const result: Container = typeChecker.generateContainer();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('EnumModel');
    expect(result[0].type).toBe(Declaration.Enum);
    expect(result[0].typeParameters).toHaveLength(0);
    expect(result[0].properties).toEqual(expectedProperties);
  });
});
