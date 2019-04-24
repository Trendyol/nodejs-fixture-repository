# Fixture Repository

This package meant to be used for faking object values based on typescript types in order to remove burden of faking data in tests. At the moment it only supports interface declarations with primitive types and nested types. Support for enums, types and classes will come later.

# Installation

`yarn add -D fixture-repository`

# Types

    fake(str:  string):  any;

# How to use

You need to create an instance of Faker. It takes a pattern for matching your model files. It uses glob npm package.

    const { Faker } = require('@trendyol/faker');

    const faker = new Faker('**/models/**');

    const result: IMyModel = faker.fake('IMyModel');

It walks through all matched files and extracts interfaces. For that reason, it is advised that you create a global faker object before you run your tests.
