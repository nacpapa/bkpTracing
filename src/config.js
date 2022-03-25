// TOMAMOS LA CONFIGURCION DE .ENV
import { config } from "dotenv";

config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const _client_id = process.env._client_id;
export const _client_secret = process.env._client_secret;
export const _REFRESH_TOKEN = process.env._REFRESH_TOKEN;
export const _user = process.env._user;
