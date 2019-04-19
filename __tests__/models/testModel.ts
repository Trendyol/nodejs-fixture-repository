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
