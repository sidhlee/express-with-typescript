import { RequestHandler } from 'express';
import { v1 as uuid } from 'uuid';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  // typecast the body of the incoming request to let TS know what's coming
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(uuid(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created todo', created: newTodo });
};
