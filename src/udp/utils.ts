import { HeaderFlags, Packet, UdpCProtocol } from "./types.ts";

export class PacketParser {
    static parse(packet: Buffer): Packet {
        const [type, flags, id] = PacketParser.parseHeader(packet);
        const body = packet.subarray(11);

        return { id, type, flags, body };
    }

    private static parseHeader(packet: Buffer): [UdpCProtocol, HeaderFlags, Buffer] {
        const type: UdpCProtocol = packet.readUInt8(0)
        const flags: HeaderFlags = packet.readUInt8(1);
        const sessionId = packet.subarray(2, 10);

        return [type, flags, sessionId];
    }
}
