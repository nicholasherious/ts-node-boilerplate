import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import User from './models/User';
import userRoutes from './routes/User';
import postRoutes from './routes/Post'

const app: Application = express();

const port = config.server.port;

/** Connect to Mongo */

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to MongoDB');
  })
  .catch((error) => {
    Logging.error(error);
  });

/** Only start server if Mongo connects */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the request */
    Logging.info(
      `Incoming Method --> [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      Logging.info(
        `Incoming Method --> [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}] - Status [${res.statusCode}]`
      );
    });

    next();
  });
};

startServer();

/** Routes */

app.use('/user', userRoutes);
app.use('/posts', postRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send({ message: 'Hello Again Typescript World' });
});

/** Health Check */

app.get('/ping', (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ message: 'pong' })
);

try {
  app.listen(port, (): void => {
    Logging.info(`Server running on port ${port}`);
  });
} catch (error) {
  Logging.error(error);
}

/** Error handling */

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('not found');
  Logging.error(error);
  return res.status(404).json({ message: error.message });
});

export default app;
