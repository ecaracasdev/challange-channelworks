import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import dotenv from 'dotenv-safe';
import DBManager from './managers/db.manager';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './swagger';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.use('/api', router);

const server = app.listen(process.env.PORT, async () => {
  await DBManager.connect();
  console.log(`Server running on port ${process.env.PORT}`);
});

const closeServer = () => {
  server.close();
};

export { app, closeServer };
