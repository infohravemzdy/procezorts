import { ISpecCode } from "./ISpecCode";
export interface ISpecDefine<T extends ISpecCode> {
    code: T;
}
