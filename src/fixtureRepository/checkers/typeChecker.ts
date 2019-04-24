import * as ts from 'typescript';

export enum Type {
  Interface,
  Enum
}

export interface IType {
  name: string;
  type: Type;
  parameters: IParameter[];
}

export interface IParameter {
  name: string;
  type: string;
  value: string | number;
}

let checker: ts.TypeChecker;
let output: IType[];

export function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): IType[] {
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
      output.push(serializeInterface(symbol));
    }
  } else if (ts.isEnumDeclaration(node) && node.name) {
    const symbol = checker.getSymbolAtLocation(node.name);
    if (symbol) {
      output.push(serializeEnum(symbol));
    }
  }
}

function serializeMainSymbol(symbol: ts.Symbol, type: Type): IType {
  return {
    type,
    name: symbol.getName(),
    parameters: []
  };
}

function serializeSymbol(symbol: ts.Symbol): IParameter {
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!) as ts.LiteralType;
  return {
    name: symbol.getName(),
    type: checker.typeToString(type),
    value: type.value as string | number
  };
}

function serializeInterface(symbol: ts.Symbol) {
  const details = serializeMainSymbol(symbol, Type.Interface);
  if (symbol.members) {
    symbol.members.forEach(member => {
      if (details.parameters) {
        details.parameters.push(serializeSymbol(member));
      }
    });
  }
  return details;
}

function serializeEnum(symbol: ts.Symbol) {
  const details = serializeMainSymbol(symbol, Type.Enum);
  if (symbol.exports) {
    symbol.exports.forEach(member => {
      if (details.parameters) {
        details.parameters.push(serializeSymbol(member));
      }
    });
  }
  return details;
}

function isNodeExported(node: ts.Node): boolean {
  return (
    (ts.isInterfaceDeclaration(node) && ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
    (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
