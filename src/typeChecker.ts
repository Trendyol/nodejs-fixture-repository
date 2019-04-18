import * as ts from 'typescript';
import * as fs from 'fs';

interface IInterfaceTypes {
  name: string;
  parameters: IInterfaceParameters[];
}

interface IInterfaceParameters {
  name: string;
  type: string;
}

let checker: ts.TypeChecker;
let output: IInterfaceTypes[];

export function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);

  checker = program.getTypeChecker();

  output = [];

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  fs.writeFileSync('classes.json', JSON.stringify(output, undefined, 4));

  return;
}

function visit(node: ts.Node) {
  if (!isNodeExported(node)) {
    return;
  }

  if (ts.isInterfaceDeclaration(node) && node.name) {
    let symbol = checker.getSymbolAtLocation(node.name);
    if (symbol) {
      output.push(serialize(symbol));
    }
  }
}

function serializeMainSymbol(symbol: ts.Symbol): IInterfaceTypes {
  return {
    name: symbol.getName(),
    parameters: []
  };
}

function serializeSymbol(symbol: ts.Symbol): IInterfaceParameters {
  return {
    name: symbol.getName(),
    type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!))
  };
}

function serialize(symbol: ts.Symbol) {
  let details = serializeMainSymbol(symbol);
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
    // @ts-ignore
    (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
    (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
