/* eslint-disable @typescript-eslint/no-explicit-any */
export type Where = Record<string, any>;
export type SelectOptions = {
  limit?: number;
  offset?: number;
  desc?: string;
  fields?: string[];
};
export type Access = {
  read: boolean;
  write: boolean;
};

/**
 * You have to implement this class
 * to add more storage supports
 * @abstract
 */
export default abstract class BaseStorage {
  constructor(public tableName: string) {}
  abstract select<T = any>(where: Where, options?: SelectOptions): Promise<T>;
  abstract count(where: Where, options?: any): Promise<number>;
  abstract add<T, U = any>(
    data: T,
    access?: Access,
  ): Promise<U>;
  abstract update<T>(data: T, where: Where): Promise<any>;
  abstract delete(where: Where): Promise<any>;
}
