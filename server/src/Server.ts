import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';

import BaseRouter from './api';
import logger from 'server/src/util/logger';
import { cookieProps } from 'server/src/util/constants';
import cors from 'cors';

import 'express-async-errors';

import * as dotenv from 'dotenv';
import { errorHandler } from './api/middleware';

dotenv.config();

/************************************************************************************
 *                              Set Database settings
 ***********************************************************************************/

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public/build')));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan<Request, Response>('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);
app.get('/*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: __dirname });
});

// Print API errors
app.use(errorHandler);

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
