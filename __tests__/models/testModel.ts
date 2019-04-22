export interface IPrimitives {
  string: string;
  number: number;
  boolean: boolean;
  null: null;
  undefined: undefined;
}

export interface INested {
  string: string;
  primitives: IPrimitives;
}

export interface IUnion {
  union: string | number | boolean;
  nestedUnion: boolean | INested;
}

export interface IArrayType {
  stringArray: string[];
  nestedArray: INested[];
}

export interface IEnumType {
  enum1: Enum1;
  enum2: Enum2;
  array: IArrayType;
}

export enum Enum1 {
  First,
  Second = 222,
  Third
}

export enum Enum2 {
  First = '444',
  Second = '2123',
  Third = '123'
}
