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

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

// RequestHandler type takes a type argument of request params
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    // this will be thrown into the default error handler middleware set up at the end of App.js
    throw new Error('Could not find todo!');
  }
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'updated', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }
  const deletedTodo = TODOS[todoIndex];
  TODOS.splice(todoIndex, 1);

  res.json({ message: 'deleted 1 todo', deletedTodo });
};
