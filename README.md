# Fixture Repository

This package meant to be used for faking object values based on typescript types in order to remove burden of faking data in tests. At the moment it only supports interface declarations with primitive types and nested types. Support for enums, types and classes will come later.

# Installation

`yarn add -D fixture-repository`

# Types

    setup(options?: any):  void;
    create(str:  string):  any;

# How to use

You need to call setup method before with required options first. It takes a pattern for matching your model files. It uses glob npm package.

    const fr = require('fixture-repository');

    fr.setup('**/models/**');

    const result: IMyModel = fr.create('IMyModel');

It walks through all matched files and extracts interfaces. For that reason, it is advised that you call setup function once before running your tests. e.g in Jest setup file.
