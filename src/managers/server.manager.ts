import express from 'express';
import * as bodyParser from 'body-parser';
import apiRoutes from '../routes';
// import responseMiddleware from '../middlewares/responseMiddleware';
// import jwtMiddleware from '../middlewares/jwtMiddleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from '../swagger';
import LoggerManager from './logger.manager';
import { responseMiddleware } from '../middlewares/response.middleware';

let server: any;

export default class ServerManager {
  static async start(): Promise<any> {
    try {
      const app = express();

      //Middlewares
      app.use(responseMiddleware);
      app.use(bodyParser.json({ limit: '50mb' }));
      app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerJSDoc(options))
      );
      app.use('/api', apiRoutes);

      server = app.listen(process.env.PORT, async () => {
        console.log(`Server running on port ${process.env.PORT}`);
      });

      return app;
    } catch (error) {
      LoggerManager.fatal('ERROR ON LOAD APP', {
        error: LoggerManager.handleError(error),
      });
    }
  }

  static closeServer = () => {
    server.close();
  };
}
