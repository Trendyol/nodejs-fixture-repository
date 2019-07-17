# Version 1.4.0
**Features**
- Added options for setup method.

        interface FrOptions {
            ignoreGlob?: string[];
            additionalFiles?: string[];
        }
        
    **ignoreGlob:** Ignore patterns during glob search. Should be glob patterns.
    **additionalFiles:** Add file paths to include in creation of type checker. These should be relative to cwd.

**Performance**
- Changed glob library from *glob* to *fast-glob*.

# Version 1.3.1
**Bugfix**
- Fix when type is not resolved correctly given array types in generic model

# Version 1.3.0
**Features**
- Add support for generic models.
- Add support for extending interfaces.

**Bugfix**
- Fix stackoverflow when trying to create an unknown type
