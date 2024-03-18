import { PacketHandler } from "../types.ts";
import { HeaderFlags, UdpCProtocol } from "../udp/types.ts";

export const HandleConnect: PacketHandler = (packet, logger, send) => {
    logger.debug('HandleConnect');

    const out = Buffer.alloc(18);
            
    out.writeUInt8(UdpCProtocol.ConnectionAccept, 0);
    out.writeUInt8(HeaderFlags.HasConnectToken, 1);

    packet.id.copy(out, 2);
    send(out);

    return true;
}
