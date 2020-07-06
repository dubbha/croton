import { Application } from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer, ServerOptions } from 'https';
import { readFileSync } from 'fs-extra';
import path from 'path';

export default class HttpsServerService {
  private getAssets(): ServerOptions {
    try {
      return {
        key: readFileSync(path.resolve('assets/server.key'), 'utf8'),
        cert: readFileSync(path.resolve('assets/server.crt'), 'utf8'),
      };
    } catch (err) {
      console.error(
        '*** Probably, could not read the sertificates, see the error for details *** \n',
        err
      );
    }
  }

  private initHttpsServer(expressApp: Application) {
    const { HTTPS_PORT = 8080 } = process.env;
    const options = this.getAssets();
    const httpsServer = createHttpsServer(options, expressApp);
    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`Https server is UP and listening to the port ${HTTPS_PORT}`);
    });
  }

  private initHttpServer(expressApp: Application) {
    const { PORT = 3000 } = process.env;
    const httpServer = createHttpServer(expressApp);
    httpServer.listen(PORT, () => {
      console.log(`Http server is UP and listening to the port ${PORT}`);
    });
  }

  public initServer(expressApp: Application) {
    this.initHttpServer(expressApp);
    this.initHttpsServer(expressApp);
  }
}
