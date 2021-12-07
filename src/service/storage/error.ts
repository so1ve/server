import BaseStorage, { Access, SelectOptions, Where } from "./base.ts";

class ErrorStorage extends BaseStorage {
  async select(_where: Where, _options?: SelectOptions): Promise<any> {
    return {
      error: "No storage type specified",
    };
  }

  async count(_where: Where = {}, _options = {}): Promise<number> {
    return 0;
  }

  async add(
    _data: any,
    _options?: Access,
  ): Promise<any> {
    return {
      error: "No storage type specified",
    };
  }

  async update(_data: any, _where: Where): Promise<any> {
    return {
      error: "No storage type specified",
    };
  }

  async delete(_where: Where): Promise<undefined> {
    return undefined;
  }
}

export default ErrorStorage;
