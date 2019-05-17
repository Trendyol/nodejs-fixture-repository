import { Project, InterfaceDeclaration } from 'ts-morph';
import { getTypeArgumentsOfExtendedType } from './helpers';

enum Declaration {
  Interface,
  Enum,
  Type
}

interface Container {
  items: ContainerItem[];
}

interface Property {
  name: string;
  type: string;
  isGeneric: boolean;
}

interface ContainerItem {
  type: Declaration;
  name: string;
  properties: Property[];
  typeParameters: string[];
}

class TypeChecker {
  private project: Project;
  constructor(files: string[]) {
    this.project = new Project();
    this.project.addExistingSourceFiles(files);

    this.generateContainer = this.generateContainer.bind(this);
    this.mapInterfaceProperties = this.mapInterfaceProperties.bind(this);
    this.getContainerItemsFromFiles = this.getContainerItemsFromFiles.bind(this);
  }

  public generateContainer(): Container {
    const container = { items: this.getContainerItemsFromFiles() };

    return container;
  }

  private getContainerItemsFromFiles(): ContainerItem[] {
    const items: ContainerItem[] = [];
    const files = this.project.getSourceFiles();

    files.forEach(file => {
      file.getInterfaces().forEach(_interface => items.push(this.mapInterfaceProperties(_interface)));
    });

    return items;
  }

  private mapInterfaceProperties(_interface: InterfaceDeclaration): ContainerItem {
    const type = Declaration.Interface;
    const name = _interface.getName();
    const properties: Property[] = [];
    const typeParameters = _interface.getTypeParameters().map(param => param.getText());

    _interface.getProperties().forEach(property => {
      const typeName = property.getTypeNode()!.getText();
      properties.push({
        type: typeName,
        name: property.getName(),
        isGeneric: property.getType().isTypeParameter()
      });
    });

    _interface.getExtends().forEach(extended => {
      const typeArguments = getTypeArgumentsOfExtendedType(extended);

      extended
        .getType()
        .getProperties()
        .forEach(property => {
          const propertyType = property.getValueDeclaration()!.getType();
          const propertyTypeName = propertyType.getText();

          properties.push({
            type: typeArguments[propertyTypeName] || propertyTypeName,
            name: property.getName(),
            isGeneric: propertyType.isTypeParameter()
          });
        });
    });

    return { type, name, properties, typeParameters };
  }
}

export { TypeChecker, Container, Declaration };
