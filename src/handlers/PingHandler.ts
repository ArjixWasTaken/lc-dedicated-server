import { PacketHandler } from "../types.ts";
import { HeaderFlags, UdpCProtocol } from "../udp/types.ts";

export const HandlePing: PacketHandler = (packet, logger, send) => {
    logger.debug('HandlePing');

    const out = Buffer.alloc(10);
    {
        out.writeUInt8(UdpCProtocol.Pong, 0);
        out.writeUInt8(HeaderFlags.None, 1);
        packet.id.copy(out, 2);
    }
    send(out);

    return true;
}
