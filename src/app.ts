// const express = require('express');
import express from 'express'; // use ES6 import to get type support

const app = express();

app.listen(8000, () => {
  console.log('listening to port 8000...');
});
