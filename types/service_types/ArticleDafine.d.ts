import { IArticleDefine } from "../service_interfaces/IArticleDefine";
import { ArticleCode } from "./ArticleCode";
import { ConceptCode } from "./ConceptCode";
import { ArticleSeqs } from "./ArticleSeqs";
import { ArticleTerm } from "./ArticleTerm";
export declare class ArticleDefine implements IArticleDefine {
    code: ArticleCode;
    seqs: ArticleSeqs;
    role: ConceptCode;
    constructor(_code: ArticleCode, _seqs: ArticleSeqs, _role: ConceptCode);
    Code(): ArticleCode;
    Seqs(): ArticleSeqs;
    Role(): ConceptCode;
    term(): ArticleTerm;
    static new(): ArticleDefine;
    static copy(defs: IArticleDefine): ArticleDefine;
    static get(_code: number, _seqs: number, _role: number): ArticleDefine;
}
