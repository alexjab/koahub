# koahub
A koa server in a can

[![Circle CI](https://circleci.com/gh/alexjab/koahub.svg?style=svg)](https://circleci.com/gh/alexjab/koahub)

Everything you need to quickly get started with koa.

```
koahub
├── package.json
├── index.js
├── config
│   └── index.js
├── middleware
│   ├── callLogger.js
│   ├── errorHandler.js
│   ├── jsonPrettifier.js
│   ├── notFound.js
│   └── versionHandler.js
├── routes
│   ├── index.js
│   └── v1
│       ├── index.js
│       ├── _default
│       │   └── controller.js
│       └── objects
│           └── controller.js
├── services
│   └── versionRouter.js
└── test
    ├── middleware
    │   ├── callLogger.test.js
    │   ├── errorHandler.test.js
    │   ├── jsonPrettifier.js
    │   ├── notFound.test.js
    │   └── versionHandler.js
    ├── routes
    │   ├── _default.test.js
    │   └── objects.test.js
    └── services
        └── versionRouter.test.js

11 directories, 21 files
```
