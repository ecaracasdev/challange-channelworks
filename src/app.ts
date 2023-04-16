import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import DBManager from './managers/db.manager';

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.use('/api', router);

const server = app.listen(PORT, async () => {
  await DBManager.connect();
  console.log(`Server running on port ${PORT}`);
});

const closeServer = () => {
  server.close();
};

export { app, closeServer };
