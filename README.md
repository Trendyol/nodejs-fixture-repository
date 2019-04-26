# Fixture Repository

This package meant to be used for faking object values based on typescript types in order to remove burden of faking data in tests. At the moment it only supports interface declarations with primitive types and nested types. Support for enums, types and classes will come later.

# Installation

`yarn add -D fixture-repository`

# Types

    setup(options?: any):  void;
    create(str:  string):  any;

# How to use
Assume you have a *personModel.ts* file and interface declaration like this:

    interface IPerson {
        name: string;
        surname: string;
        age: number;
    }   

You need to call setup method before with required options first. It takes a pattern for matching your model files. It uses glob for that.

    import fr from 'fixture-repository';

    fr.setup('**/*Model.ts');

    const person: IPerson = fr.create('IPerson');

It would generate required properties.It walks through all matched files and extracts interfaces. For that reason, it is advised that you call setup function once before running your tests. e.g in Jest setup file.
