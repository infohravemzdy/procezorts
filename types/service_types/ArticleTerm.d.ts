import { ArticleCode } from "./ArticleCode";
import { ArticleSeqs } from "./ArticleSeqs";
export declare class ArticleTerm {
    code: ArticleCode;
    seqs: ArticleSeqs;
    constructor(article: ArticleCode, sequens: ArticleSeqs);
    static zero(): ArticleTerm;
    static new(): ArticleTerm;
    static get(code: number, seqs: number): ArticleTerm;
    static compareTo(x: ArticleTerm, y: ArticleTerm): number;
}
