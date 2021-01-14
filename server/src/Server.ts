import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';

import BaseRouter from './routes';
import logger from '@shared/logger';
import { cookieProps } from '@shared/constants';

import 'express-async-errors';

import Knex from 'knex';
import knexConfig from './knexfile';

import dotenv from 'dotenv';
dotenv.config();

/************************************************************************************
 *                              Set Database settings
 ***********************************************************************************/

const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/index.html')));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan<Request, Response>('dev'));
}

console.log('PORT', process.env.PORT);
// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message
  });
});

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
