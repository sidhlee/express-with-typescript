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

First add utility middlewares like `body-parser`

```ts
import { json } from 'body-parser'; // import json middleware

// parse the body of all incoming request and extract any json data,
// then attach it to the req.body
app.use(json());
```

Then, to add route middlewares, import `Request`, `Response`, and `NextFunction` type from express to type the middleware parameters

```ts
import express, { Request, Response, NextFunction } from 'express';

// ...

// express error handler (comes at the end like "catch")
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
```

Or you could use `ErrorHandler` type for error handling middleware

```ts
// errorhandler
const errorHandler: express.ErrorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err);
};

app.use(errorHandler);

// same as above (individual typing)
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
  }
);
```

You also have `RequestHandler` for request handlers

```ts
export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};
```

## Setting up router methods with controllers

After writing controllers, you can pass them to the corresponding router methods

`src/routes/todos.ts`

```ts
import { Router } from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todos';

const router = Router(); // create Router instance

// Now call route methods with path and controller
router.post('/', createTodo);

router.get('/', getTodos);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router; // export router
```

You can use exported router instance in app.js

```ts
import todoRoutes from './routes/todos';

// utility middlewares...

app.use('/todos', todoRoutes);

// error handler middleware & listen
```

## Class is a type in TypeScript

Just like type alias and interface
`src/models/todo.ts`

```ts
export class Todo {
  constructor(public id: string, public text: string) {}
}
```

...And you can instantiate it.
`src/controllers/todos.ts`

```ts
export const createTodo: RequestHandler = (req, res, next) => {
  // typecast the body of the incoming request to let TS know what's coming
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(uuid(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created todo', created: newTodo });
};
```

TypeScript has no idea what the type of the request body will be unless you tell him. (by typecasting)

## Typing request params

To get type support on `req.params`, pass a type argument to `RequestHandler` type

```ts
// RequestHandler type takes a type argument of request params
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  // Typecast the payload
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    // this will be thrown into the default error handler middleware set up at the end of App.js
    throw new Error('Could not find todo!');
  }
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'updated', updatedTodo: TODOS[todoIndex] });
};
```

## More express type examples

https://github.com/types/express/tree/master/test
