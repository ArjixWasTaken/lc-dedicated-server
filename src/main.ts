import { handlers } from './handlers/index.ts';
import { Logger } from './logger.ts';
import { UdpServer } from './udp-server.ts';
import { PacketParser } from './udp/utils.ts';

const app = new UdpServer(6969, "127.0.0.1");

app.use((req, res, next) => {
    const packet = PacketParser.parse(req.message);
    const logger = new Logger(packet);

    let handled = false;
    for (const handler of handlers) {
        if (handled) break;
        handled = handler(packet, logger, res.send);
    }

    if (!handled) {
        logger.error("Didn't handle", packet.type);
        next();
    }
})

app.listen();
