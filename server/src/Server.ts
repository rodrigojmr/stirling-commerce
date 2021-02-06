import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';

import BaseRouter from './routes';
import logger from '@servershared/logger';
import { cookieProps } from '@servershared/constants';
import cors from 'cors';

import 'express-async-errors';

import * as dotenv from 'dotenv';

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
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(BAD_REQUEST).json({
    error: err.message
  });
});

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
