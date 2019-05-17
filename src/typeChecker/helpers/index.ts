import { ExpressionWithTypeArguments, InterfaceDeclaration } from 'ts-morph';

export function getTypeArgumentsOfExtendedType(extendedType: ExpressionWithTypeArguments) {
  const argumentBaseTypes: string[] = extendedType
    .getType()
    .getSymbol()!
    .getDeclaredType()
    .getTypeArguments()
    .map(argument => argument.getText());

  const argumentGivenTypes: string[] = extendedType.getTypeArguments().map(typeArgument => typeArgument.getText());

  const mappedTypes: { [key: string]: string } = {};
  argumentBaseTypes.forEach((baseType, index) => {
    mappedTypes[baseType] = argumentGivenTypes[index];
  });

  return mappedTypes;
}
