import * as ts from 'typescript';
import path from 'path';
import { generateDocumentation } from './typeChecker';

export function fake() {
  const values: any = generateDocumentation([path.join(__dirname, '../__tests__/interfaces.ts'), path.join(__dirname, '../__tests__/test.ts')], {});
  // console.log(values)
}

fake();
