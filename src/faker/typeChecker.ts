import * as ts from 'typescript';
import * as fs from 'fs';

export interface IInterfaceType {
  name: string;
  parameters: IInterfaceParameter[];
}

export interface IInterfaceParameter {
  name: string;
  type: string;
}

let checker: ts.TypeChecker;
let output: IInterfaceType[];

export function generateDocumentation(
  fileNames: string[],
  options: ts.CompilerOptions
): IInterfaceType[] {
  const program = ts.createProgram(fileNames, options);

  checker = program.getTypeChecker();

  output = [];

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  return output;
}

function visit(node: ts.Node) {
  if (!isNodeExported(node)) {
    return;
  }

  if (ts.isInterfaceDeclaration(node) && node.name) {
    const symbol = checker.getSymbolAtLocation(node.name);
    if (symbol) {
      output.push(serialize(symbol));
    }
  }
}

function serializeMainSymbol(symbol: ts.Symbol): IInterfaceType {
  return {
    name: symbol.getName(),
    parameters: []
  };
}

function serializeSymbol(symbol: ts.Symbol): IInterfaceParameter {
  return {
    name: symbol.getName(),
    type: checker.typeToString(
      checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
    )
  };
}

function serialize(symbol: ts.Symbol) {
  const details = serializeMainSymbol(symbol);
  if (symbol.members) {
    symbol.members.forEach(member => {
      if (details.parameters) {
        details.parameters.push(serializeSymbol(member));
      }
    });
  }
  return details;
}

function isNodeExported(node: ts.Node): boolean {
  return (
    (ts.isInterfaceDeclaration(node) &&
      ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
    (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
