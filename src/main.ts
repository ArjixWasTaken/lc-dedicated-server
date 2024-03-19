import { Logger } from "tslog";
import { UdpServer } from './udp-server.ts';
import { UdpCHeader } from "./structs/UdpCPacket.ts";
import { HeaderFlags, UdpCProtocol } from './udp/types.ts';

const logger = new Logger({ name: "app" });
const app = new UdpServer(6969, "127.0.0.1", logger);

app.use((req, res) => {
    const packet = UdpCHeader.valueFromBytes(req.message);
    const log = logger.getSubLogger({ name: `[0x${packet.SessionId.toString('hex')}]` });

    log.debug("Start of request");

    switch (packet.Type) {
        case UdpCProtocol.ConnectionRequest: {
            log.silly("ConnectionRequest");
            const header = UdpCHeader.bytesFromValue({
                Type: UdpCProtocol.ConnectionAccept,
                Flags: HeaderFlags.HasConnectToken,
                SessionId: packet.SessionId
            });

            // TODO: Investigate what the trailing 8 bytes are supposed to be.
            res.send(Buffer.concat([header, Buffer.alloc(8)]));
            break;
        }

        case UdpCProtocol.Ping: {
            log.silly("Pong!");
            const header = UdpCHeader.bytesFromValue({
                Type: UdpCProtocol.Pong,
                Flags: HeaderFlags.None,
                SessionId: packet.SessionId
            });

            res.send(Buffer.concat([header, Buffer.alloc(8)]));
            break;
        }

        default: {
            log.warn("NotImplemented", UdpCProtocol[packet.Type]);
            break;
        }
    }

    log.debug("End of request");
})

app.listen();
