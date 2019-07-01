import { PrimitiveType } from '../generators/primitiveValueGenerator';

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

export function isArray(type: string): boolean {
  return type.endsWith('[]');
}

export function isUnion(type: string): boolean {
  return type.includes('|');
}

export function isIntersect(type: string): boolean {
  return type.includes('&');
}

export function isGeneric(type: string): boolean {
  return type.includes('<') && type.endsWith('>');
}
