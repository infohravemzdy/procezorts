import {ArticleCode} from "./ArticleCode";
import {ArticleSeqs} from "./ArticleSeqs";

export class ArticleTerm {
    code: ArticleCode;
    seqs: ArticleSeqs;

    constructor(article: ArticleCode, sequens: ArticleSeqs) {
        this.code = article;
        this.seqs = sequens;
    }
    static zero(): ArticleTerm {return ArticleTerm.new(); }
    static new(): ArticleTerm {return new ArticleTerm(ArticleCode.zero(), ArticleSeqs.zero()); }
    static get (code: number, seqs: number): ArticleTerm {return new ArticleTerm(ArticleCode.get(code), ArticleSeqs.get(seqs)); }
    static compareTo(x: ArticleTerm, y: ArticleTerm): number {
        if (x.seqs.value > y.seqs.value) {
            return 1;
        }
        if (x.seqs.value < y.seqs.value) {
            return -1;
        }
        if (x.code.value > y.code.value) {
            return 1;
        }
        if (x.code.value < y.code.value) {
            return -1;
        }
        return 0;
    }
}