import { ExpressionWithTypeArguments, InterfaceDeclaration, EnumDeclaration, TypeFormatFlags } from 'ts-morph';
import { Property } from '..';

export function getTypeArgumentsOfExtendedType(extendedType: ExpressionWithTypeArguments) {
  const mappedTypes: { [key: string]: string } = {};
  const symbol = extendedType.getType().getSymbol();

  const argumentBaseTypes: string[] = symbol
    ? symbol
        .getDeclaredType()
        .getTypeArguments()
        .map(argument => argument.getText())
    : [];

  const argumentGivenTypes: string[] = extendedType.getTypeArguments().map(typeArgument => typeArgument.getText());

  argumentBaseTypes.forEach((baseType, index) => {
    mappedTypes[baseType] = argumentGivenTypes[index];
  });

  return mappedTypes;
}

export function getPropertiesOfInterfaceDeclaration(_interface: InterfaceDeclaration) {
  return _interface.getProperties().map(property => {
    const typeName = property.getTypeNode()!.getText();

    return {
      type: typeName,
      name: property.getName(),
      isGeneric: property.getType().isTypeParameter()
    };
  });
}

export function getExtendedPropertiesOfInterfaceDeclaration(_interface: InterfaceDeclaration) {
  const properties: Property[] = [];

  _interface.getExtends().forEach(extended => {
    const typeArguments = getTypeArgumentsOfExtendedType(extended);

    return extended
      .getType()
      .getProperties()
      .forEach(property => {
        const propertyType = property.getValueDeclaration()!.getType();
        const propertyTypeName = propertyType.getText(undefined, TypeFormatFlags.InTypeAlias);

        properties.push({
          type: typeArguments[propertyTypeName] || propertyTypeName,
          name: property.getName(),
          isGeneric: propertyType.isTypeParameter()
        });
      });
  });

  return properties;
}

export function getMembersOfEnumDeclaration(_enum: EnumDeclaration) {
  const properties: Property[] = [];

  _enum.getMembers().forEach(member => {
    properties.push({
      type: member
        .getType()
        .getText(undefined, TypeFormatFlags.InTypeAlias),
      name: member.getName(),
      isGeneric: member.getType().isTypeParameter(),
      value: member.getValue()
    });
  });

  return properties;
}
