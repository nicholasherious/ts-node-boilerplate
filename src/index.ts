import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';


const app: Application = express();
const port = process.env.PORT || 4000;
dotenv.config();

app.use(express.json());
app.use(morgan('tiny'));



app.get('/', async (req: Request, res: Response) => {
  res.send({ message: 'Hello Typescript World' });
});

try {
  app.listen(port, (): void => {
    console.log(`[Server] running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
