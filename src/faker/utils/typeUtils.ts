import { PrimitiveType } from '../generators/primitiveValueGenerator';

export function isArray(type: string): boolean {
  return type.indexOf('[]') > -1;
}

export function isPrimitive(type: string): boolean {
  const typeToCheck = type.toLowerCase();
  return (
    typeToCheck === PrimitiveType.Boolean ||
    typeToCheck === PrimitiveType.String ||
    typeToCheck === PrimitiveType.Null ||
    typeToCheck === PrimitiveType.Number ||
    typeToCheck === PrimitiveType.Undefined
  );
}

export function isUnion(type: string): boolean {
  return type.indexOf('|') > -1;
}
