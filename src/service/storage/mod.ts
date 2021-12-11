import { SupportedStorage } from "../../types/mod.ts";
import BaseStorage from "./base.ts";
import ErrorStorage from "./error.ts";
import LeancloudStorage from "./leancloud.ts";

const STORAGE_TYPE = Deno.env.get("STORAGE_TYPE") || "error";

const storages = {
  error: ErrorStorage,
  leancloud: LeancloudStorage,
};

type GetStorageArguments = {
  tableName: string;
  storage?: SupportedStorage;
};
/**
 * By default, this function loads
 * storage name from `process.env`
 */
export const getStorage = ({
  tableName,
  storage,
}: GetStorageArguments): BaseStorage => {
  storage = storage! || STORAGE_TYPE;
  console.log(Deno.env.get("STORAGE_TYPE"));
  return new storages[storage](tableName);
};
