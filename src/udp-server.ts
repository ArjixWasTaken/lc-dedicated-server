import dgram from 'node:dgram';
import type { Logger } from "tslog";
import type { Request, Response, MiddlewareListener } from './types.ts';

export class UdpServer {
    private server: dgram.Socket;
    private port: number;
    private host: string;
    private logger: Logger<unknown>;
    private middlewares: Array<(req: Request, res: Response, next: () => void) => void> = [];

    constructor(port: number, host: string, logger: Logger<unknown>) {
        this.server = dgram.createSocket('udp4');
        this.port = port;
        this.host = host;
        this.logger = logger;

        this.server.on('error', (err) => {
            this.logger.error(`UDP Server error:\n${err.stack}`);
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
            this.logger.info(`UDP Server listening on ${this.host}:${this.port}`);
            if (callback) {
                callback();
            }
        });
    }
}
