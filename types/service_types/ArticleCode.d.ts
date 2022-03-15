import { ISpecCode } from "../service_interfaces/ISpecCode";
export declare class ArticleCode implements ISpecCode {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): ArticleCode;
    static new(): ArticleCode;
    static get(value: number): ArticleCode;
}
