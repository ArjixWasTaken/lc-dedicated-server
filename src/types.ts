import type {RemoteInfo} from 'node:dgram';
import { Packet } from './udp/types.ts';
import { Logger } from './logger.ts';

export interface Request {
    message: Buffer;
    remoteInfo: RemoteInfo;
}

export type Reply = (data: Buffer) => void;
export interface Response {
    send: Reply
}

export type MiddlewareListener = (req: Request, res: Response, next: () => void) => void;
export type PacketHandler = (packet: Packet, logger: Logger, reply: Reply) => boolean;
