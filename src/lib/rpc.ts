import { hc } from "hono/client";
import { AppRouteType } from "@/app/api/[[...route]]/route";

const APP_ENV = process.env.NEXT_PUBLIC_APP_URL;

export const RPCClient = hc<AppRouteType>(APP_ENV!);
