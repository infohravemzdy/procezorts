import {ISpecSeqs} from "../service_interfaces/ISpecSeqs";

export class ArticleSeqs implements ISpecSeqs {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static zero(): ArticleSeqs {return ArticleSeqs.new(); }
    static new(): ArticleSeqs {return new ArticleSeqs(ArticleSeqs.ZERO_VALUE); }
    static get(value: number): ArticleSeqs {return new ArticleSeqs(value); }
}