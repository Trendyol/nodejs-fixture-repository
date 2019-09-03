[![CircleCI](https://circleci.com/gh/Trendyol/nodejs-fixture-repository.svg?style=svg)](https://circleci.com/gh/Trendyol/nodejs-fixture-repository)

# Fixture Repository

This package meant to be used for faking object values based on typescript types in order to remove burden of faking data in tests. At the moment it only supports interface declarations with primitive types and nested types. Support for enums, types and classes will come later.

# Installation

`yarn add -D fixture-repository`

# Types
    interface FrOptions {
      ignoreGlob?: string[];
      additionalFiles?: string[];
    }

    setup(options?: FrOptions): void;
    create(str: string): any;

# How to use
Assume you have a *personModel.ts* file and interface declaration like this:

    interface IPerson {
      name: string;
      surname: string;
      age: number;
    }   

Easiest way to use is calling setup method before with required options first. It takes a glob pattern to match your model files.

    import fr from 'fixture-repository';

    fr.setup('**/*Model.ts');

    const person: IPerson = fr.create('IPerson');

It would generate required properties. It walks through all matched files and extracts interfaces. Calling setup method in every test is something you probably do not want, since it increases time to run the test drastically. Therefore, it would be a good idea to call it earlier in more general scope.

### Example Usage With Jest
Jest sandboxes every test environment based on OS cores. So, there is not a way to initiate a single fr setup. The way I prefer to call setup is via custom [test environment](https://jestjs.io/docs/en/configuration#testenvironment-string). Test enviroment is called only once per worker, and since they work in parallel it reduces time to generate fr container. A simple custom environment would be like this:

    const NodeEnvironment = require('jest-environment-node');
    const fr = require('fixture-repository').default;

    fr.setup('src/**/model*/**/*.ts', {
        ignoreGlob: ['**/client*/**']
    });

    class CustomEnvironment extends NodeEnvironment {
        constructor(config, context) {
            super(config, context);
            this.testPath = context.testPath;
        }

        async setup() {
            await super.setup();

            this.global.fr = fr;
        }

        async teardown() {
            delete this.global.fr;

            await super.teardown();
        }

        runScript(script) {
            return super.runScript(script);
        }
    }

    module.exports = CustomEnvironment;

Then in your test you could easily use like this without importing fr ever again.

    global.fr.create('IPerson');


