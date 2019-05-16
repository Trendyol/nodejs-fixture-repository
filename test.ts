import { Project, InterfaceDeclaration } from 'ts-morph';

const project = new Project();
project.addExistingSourceFiles('*/*/extendsInterfaceModel.ts');
const files = project.getSourceFiles();
files.forEach(file => {
  const _interface = file.getInterfaces()[0];
  const extendedTypes = _interface.getExtends();

  _interface.getExtends().forEach(type => {
    type
      .getType()
      .getProperties()
      .forEach(property => {
        console.log(property.getValueDeclaration()!.getType().getText());
      });
  });
});
