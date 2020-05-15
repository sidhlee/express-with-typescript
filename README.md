# Express.js & TypeScript

## Setting up an Express project with TypeScript

### init npm & tsc

Create package.json & tsconfig.json

```bash
$ npm init --yes
$ tsc --init
```

Configure tsconfig file

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
}
```

Create the `./src` folder

### Install packages & types

Install express , body-parser , and nodemon

```bash
$ npm install --save express body-parser
$ npm install --save-dev nodemon
```

Install node types

```bash
npm install --save-dev @types/node
```

Install express types

```bash
npm install --save-dev @types/express
```

### Use ES6 import for type support

```ts
// const express = require('express'); // no type support
import express from 'express';

const app = express();
app.listen(8000);
```

### Watch ts file and run server

```bash
$ tsc -w
```

Now src/app.ts is compiled into dist/app.js

Add start script to package.json

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon dist/app.js"
  }
}
```

Open up the second terminal and start server

```bash
$ npm start
```

## Adding Middlewares & Types

## Class is a type in TypeScript

just like type alias and interface
