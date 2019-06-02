import { Primitives } from './interfaceModel';
import { ArrayProperties } from './interfaceWithArrayPropertiesModel';

export interface WithUnionProperties {
  union: string | number;
  union2: Primitives | ArrayProperties;
  union3: string | boolean | Primitives;
}
