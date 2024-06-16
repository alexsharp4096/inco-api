// equivalent of older: const express = require('express')
import * as express from 'express';
import { routes } from './routes/routes'; 
const app = express();// Allow any method from any host and log requests
app.use('/', routes);
