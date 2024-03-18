import { UdpServer } from './udp-server.ts';
import { UdpCHeader } from "./structs/UdpCPacket.ts";
import { HeaderFlags, UdpCProtocol } from './udp/types.ts';

const app = new UdpServer(6969, "127.0.0.1");

app.use((req, res) => {
    const packet = UdpCHeader.valueFromBytes(req.message);
    switch (packet.Type) {
        case UdpCProtocol.ConnectionRequest: {
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
            const header = UdpCHeader.bytesFromValue({
                Type: UdpCProtocol.Pong,
                Flags: HeaderFlags.None,
                SessionId: packet.SessionId
            });

            res.send(Buffer.concat([header, Buffer.alloc(8)]));
            break;
        }

        default: {
            console.log(`[0x${packet.SessionId.toString('hex')}]`, "NotImplemented:", UdpCProtocol[packet.Type]);
            return;
        }
    }

    console.log(`[0x${packet.SessionId.toString('hex')}]`, "Replied to", UdpCProtocol[packet.Type]);
})

app.listen();
