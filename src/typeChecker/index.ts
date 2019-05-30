import { Project, InterfaceDeclaration } from 'ts-morph';
import { getPropertiesOfInterfaceDeclaration, getExtendedPropertiesOfInterfaceDeclaration } from './helpers';

enum Declaration {
  Interface,
  Enum,
  Type
}

type Container = ContainerItem[];

export interface Property {
  name: string;
  type: string;
  isGeneric: boolean;
}

export interface ContainerItem {
  type: Declaration;
  name: string;
  properties: Property[];
  typeParameters: string[];
  isGeneric: boolean;
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
    return this.getContainerItemsFromFiles();
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
    let properties: Property[] = [];

    const type = Declaration.Interface;
    const name = _interface.getName();
    const typeParameters = _interface.getTypeParameters().map(param => param.getText());
    const isGeneric = typeParameters.length > 0;

    properties = properties.concat(
      getPropertiesOfInterfaceDeclaration(_interface),
      getExtendedPropertiesOfInterfaceDeclaration(_interface)
    );

    return { type, name, properties, typeParameters, isGeneric };
  }
}

export { TypeChecker, Container, Declaration };
