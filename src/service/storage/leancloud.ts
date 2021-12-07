// The source code is from [Waline](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/leancloud.js) and has been modified to apply to typescript.
// Thanks !
import * as _ from "lodash";
import AV from "leancloud-storage";

import BaseStorage, { Access, SelectOptions, Where } from "./base.ts";

const {
  LEAN_APP_ID,
  LEAN_APP_KEY,
  LEAN_MASTER_KEY,
  LEAN_SERVER,
} = Deno.env.toObject();

if (LEAN_APP_ID && LEAN_APP_KEY && LEAN_MASTER_KEY) {
  AV.Cloud.useMasterKey();
  AV.init({
    appId: LEAN_APP_ID,
    appKey: LEAN_APP_KEY,
    masterKey: LEAN_MASTER_KEY,
    // required for leancloud china
    serverURL: LEAN_SERVER,
  });
}

/**
 * Leancloud storage implement
 * @see https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/leancloud.js
 */
class LeancloudStorage extends BaseStorage {
  /**
   * @param {AV.Query} instance Leancloud Query instance
   * @param {Where} where SQL-Like where condition
   * @returns {any}
   */
  private where(instance: AV.Query<any>, where: Where): any {
    if (_.isEmpty(where)) {
      return;
    }

    for (const k in where) {
      if (_.isString(where[k]) || _.isNumber(where[k])) {
        instance.equalTo(k, where[k]);
        continue;
      }
      if (where[k] === undefined) {
        instance.doesNotExist(k);
      }
      if (Array.isArray(where[k])) {
        if (where[k][0]) {
          const handler = where[k][0].toUpperCase();
          switch (handler) {
            case "IN":
              instance.containedIn(k, where[k][1]);
              break;
            case "NOT IN":
              instance.notContainedIn(k, where[k][1]);
              break;
            case "LIKE": {
              const first = where[k][1][0];
              const last = where[k][1].slice(-1);
              if (first === "%" && last === "%") {
                instance.contains(k, where[k][1].slice(1, -1));
              } else if (first === "%") {
                instance.endsWith(k, where[k][1].slice(1));
              } else if (last === "%") {
                instance.startsWith(k, where[k][1].slice(0, -1));
              }
              break;
            }
            case "!=":
              instance.notEqualTo(k, where[k][1]);
              break;
            case ">":
              instance.greaterThan(k, where[k][1]);
              break;
            case "<":
              instance.lessThan(k, where[k][1]);
              break;
            default:
              break;
          }
        }
      }
    }
  }

  private async _select<T = unknown>(where: Where, {
    desc,
    limit,
    offset,
    fields,
  }: SelectOptions = {}): Promise<T> {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    if (desc) {
      instance.descending(desc);
    }
    if (limit) {
      instance.limit(limit);
    }
    if (offset) {
      instance.skip(offset);
    }
    if (fields) {
      instance.select(fields);
    }

    const data = await instance.find().catch((e) => {
      if (e.code === 101) {
        return [];
      }
      throw e;
    });
    return data.map((item) => item.toJSON()) as unknown as T;
  }

  /**
   * @param {Where} where SQL-Like where condition
   * @param {SelectAndCountOptions} options Options
   * @returns {T} Data
   */
  async select<T = unknown>(
    where: Where,
    options: SelectOptions = {},
  ): Promise<T> {
    let data: unknown[] | T | PromiseLike<T> = [];
    let ret: string | ConcatArray<unknown> = [];
    do {
      options.offset = (options.offset ?? 0) + data.length;
      ret = await this._select(where, options);
      data = data.concat(ret);
    } while (ret.length === 100);

    return data as unknown as T;
  }

  /**
   * Count
   * @param {Where} where SQL-Like where condition
   * @param {CountOptions} options Options
   * @returns
   */
  async count(where: Where = {}, options = {}): Promise<number> {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    return await instance.count(options).catch((e) => {
      if (e.code === 101) {
        return 0;
      }
      throw e;
    });
  }

  async add<T, U = unknown>(
    data: T,
    access: Access = { read: true, write: true },
  ): Promise<U> {
    const Table = AV.Object.extend(this.tableName);
    const instance = new Table();
    instance.set(data);

    const acl = new AV.ACL();
    acl.setPublicReadAccess(access.read);
    acl.setPublicWriteAccess(access.write);
    instance.setACL(acl);

    const resp = await instance.save();
    return resp.toJSON() as U;
  }

  /**
   * Update some data
   * @param {T} data Something to update with
   * @param {Where} where SQL-Like where condition
   * @returns {T}
   */
  async update<T, U = unknown[]>(data: T, where: Where): Promise<U[]> {
    const instance = new AV.Query(this.tableName);
    this.where(instance, where);
    const ret = await instance.find();

    return await Promise.all(
      ret.map(async (item) => {
        if (_.isFunction(data)) {
          item.set(data(item.toJSON()));
        } else {
          item.set(data);
        }

        const resp = await item.save();
        return resp.toJSON();
      }),
    ) as U[];
  }

  /**
   * Delete some data
   * @param {Where} where SQL-Like where condition
   * @returns {void | AV.Error}
   */
  async delete(where: Where): Promise<(void | AV.Error)[]> {
    const instance = new AV.Query<AV.Object>(this.tableName);
    this.where(instance, where);
    const data = await instance.find();

    return await AV.Object.destroyAll(data);
  }
}

export default LeancloudStorage;
