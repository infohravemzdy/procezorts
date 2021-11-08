import {ISpecCode} from "../service_interfaces/ISpecCode";

export class ArticleCode implements ISpecCode {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static new(): ArticleCode {return new ArticleCode(ArticleCode.ZERO_VALUE); }
    static get(value: number): ArticleCode {return new ArticleCode(value); }
}