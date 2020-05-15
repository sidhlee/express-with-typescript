// const express = require('express');
import express, { Request, Response, NextFunction } from 'express'; // use ES6 import to get type support
import { json } from 'body-parser'; // import json middleware

import todoRoutes from './routes/todos';

const app = express();

// parse the body of all incoming request and extract any json data,
// then attach it to the req.body
app.use(json());

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(8000, () => {
  console.log('listening to port 8000...');
});
