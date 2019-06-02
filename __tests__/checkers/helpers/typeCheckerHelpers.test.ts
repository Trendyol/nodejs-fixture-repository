import {
  getTypeArgumentsOfExtendedType,
  getPropertiesOfInterfaceDeclaration
} from '../../../src/typeChecker/helpers/index';
import { ExpressionWithTypeArguments, InterfaceDeclaration } from 'ts-morph';

describe('typeCheker helpers tests', () => {
  it('getTypeArgumentsOfExtendedType maps extended type arguments correctly when no arguments', () => {
    const extendedType = {
      getType: () => {
        return {
          getSymbol: () => {
            return {
              getDeclaredType: () => {
                return {
                  getTypeArguments: () => {
                    return [];
                  }
                };
              }
            };
          }
        };
      },
      getTypeArguments: () => {
        return [];
      }
    };

    const result = getTypeArgumentsOfExtendedType(extendedType as ExpressionWithTypeArguments);
    expect(result).toEqual({});
  });

  it('getTypeArgumentsOfExtendedType maps extended type arguments correctly when there are arguments', () => {
    const extendedType = {
      getType: () => {
        return {
          getSymbol: () => {
            return {
              getDeclaredType: () => {
                return {
                  getTypeArguments: () => {
                    return [{ getText: () => 'T' }, { getText: () => 'P' }];
                  }
                };
              }
            };
          }
        };
      },
      getTypeArguments: () => {
        return [{ getText: () => 'string' }, { getText: () => 'number' }];
      }
    };

    const result = getTypeArgumentsOfExtendedType(extendedType as ExpressionWithTypeArguments);
    expect(result).toEqual({ T: 'string', P: 'number' });
  });

  it('getPropertiesOfInterfaceDeclaration maps interface properties correctly when properties exist', () => {
    const _interface = {
      getProperties: () => {
        return [
          {
            getTypeNode: () => {
              return {
                getText: () => {
                  return 'string';
                }
              };
            },
            getName: () => {
              return 'property1';
            },
            getType: () => {
              return {
                isTypeParameter: () => {
                  return false;
                }
              };
            }
          }
        ];
      }
    };

    const result = getPropertiesOfInterfaceDeclaration(_interface as InterfaceDeclaration);
    expect(result).toEqual([{ name: 'property1', type: 'string', isGeneric: false }]);
  });

  it('getPropertiesOfInterfaceDeclaration maps interface properties correctly when no properties exist', () => {
    const _interface = {
      getProperties: () => {
        return [];
      }
    };

    const result = getPropertiesOfInterfaceDeclaration(_interface as InterfaceDeclaration);
    expect(result).toEqual([]);
  });
});
