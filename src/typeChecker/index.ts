import { Project, InterfaceDeclaration, EnumDeclaration } from 'ts-morph';
import {
  getPropertiesOfInterfaceDeclaration,
  getExtendedPropertiesOfInterfaceDeclaration,
  getMembersOfEnumDeclaration
} from './helpers';

export enum Declaration {
  Interface,
  Enum,
  Type
}

export type Container = ContainerItem[];

export interface Property {
  name: string;
  type: string;
  isGeneric: boolean;
  value?: any;
}

export interface ContainerItem {
  type: Declaration;
  name: string;
  properties: Property[];
  typeParameters: string[];
  isGeneric: boolean;
}

export class TypeChecker {
  private project: Project;
  constructor(files: string[]) {
    this.project = new Project();
    this.project.addSourceFilesAtPaths(files);

    this.generateContainer = this.generateContainer.bind(this);
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
      file
        .getEnums()
        .filter(_enum => !_enum.isConstEnum())
        .forEach(_enum => items.push(this.mapEnumMembers(_enum)));
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

  private mapEnumMembers(_enum: EnumDeclaration): ContainerItem {
    let properties: Property[] = [];

    const type = Declaration.Enum;
    const name = _enum.getName();
    const typeParameters: string[] = [];
    const isGeneric = typeParameters.length > 0;

    properties = properties.concat(getMembersOfEnumDeclaration(_enum));

    return { type, name, properties, typeParameters, isGeneric };
  }
}
