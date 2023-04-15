import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const closeServer = () => {
  server.close();
};

export { app, closeServer };
