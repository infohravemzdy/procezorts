import { ISpecSeqs } from "../service_interfaces/ISpecSeqs";
export declare class ArticleSeqs implements ISpecSeqs {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): ArticleSeqs;
    static new(): ArticleSeqs;
    static get(value: number): ArticleSeqs;
}
