export enum UdpCProtocol {
    ConnectionRequest = 0,
    ConnectionReject = 1,
    ConnectionAccept = 2,
    Disconnect = 3,
    Data = 4,
    Ping = 5,
    Pong = 6,
}

export enum HeaderFlags {
    HasConnectToken = 0,
    HasPipeline = 1,
}

export interface Packet {
    id: Buffer
    type: UdpCProtocol
    flags: HeaderFlags
    body: Buffer
}
