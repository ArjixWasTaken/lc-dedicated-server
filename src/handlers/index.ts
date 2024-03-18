import { HandleConnect } from "./ConnectionRequest.ts";
import { HandlePing } from "./PingHandler.ts";

export const handlers = [HandleConnect, HandlePing];
