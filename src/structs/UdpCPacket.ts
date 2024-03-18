import { struct, uint8, byte } from "struct-fu";
import { HeaderFlags, UdpCProtocol } from "../udp/types.ts";

type UdpCHeader = {
    Type: UdpCProtocol,
    Flags: HeaderFlags,
    SessionId: Buffer
}

export const UdpCHeader = struct<UdpCHeader>("UdpCHeader", [
    uint8<UdpCProtocol>("Type"),
    uint8("Flags"),
    byte("SessionId", 8)
]);
