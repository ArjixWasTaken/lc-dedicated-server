import dgram from 'node:dgram';
import { Request, Response, MiddlewareListener } from './types.ts';

export class UdpServer {
  private server: dgram.Socket;
  private port: number;
  private host: string;
  private middlewares: Array<(req: Request, res: Response, next: () => void) => void> = []; 

  constructor(port: number, host: string) {
    this.server = dgram.createSocket('udp4');
    this.port = port;
    this.host = host;

    this.server.on('error', (err) => {
      console.error(`UDP Server error:\n${err.stack}`);
      this.server.close();
    });

    this.server.on('message', (msg, rinfo) => {
      this.handleRequest(msg, rinfo);
    });
  }

  use(middleware: MiddlewareListener) {
    this.middlewares.push(middleware);
  }

  private handleRequest(msg: Buffer, rinfo: dgram.RemoteInfo) {
    const req: Request = { 
      message: msg,
      remoteInfo: rinfo,
    }; 
    const res: Response = { 
      send: (data) => this.server.send(data, rinfo.port, rinfo.address)
    };

    const runMiddlewares = (index: number) => {
      if (index < this.middlewares.length) {
        this.middlewares[index](req, res, () => runMiddlewares(index + 1));
      }
    };
    runMiddlewares(0);
  }

  listen(callback?: () => void) {
    this.server.bind(this.port, this.host, () => {
      console.log(`UDP Server listening on ${this.host}:${this.port}`);
      if (callback) {
        callback();
      }
    });
  }
}
