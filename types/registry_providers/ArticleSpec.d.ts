import { IArticleSpec } from "../service_interfaces/IArticleSpec";
import { ArticleCode } from "../service_types/ArticleCode";
import { ConceptCode } from "../service_types/ConceptCode";
import { IArticleDefine } from "../service_interfaces/IArticleDefine";
import { ISpecCode } from "../service_interfaces/ISpecCode";
import { ArticleSeqs } from "../service_types/ArticleSeqs";
import { ArticleTerm } from "../service_types/ArticleTerm";
export declare abstract class ArticleSpec implements IArticleSpec {
    code: ArticleCode;
    seqs: ArticleSeqs;
    role: ConceptCode;
    sums: ArticleCode[];
    protected constructor(_code: ArticleCode, _seqs: ArticleSeqs, _role: ConceptCode, _sums: Iterable<ArticleCode>);
    Code(): ArticleCode;
    Seqs(): ArticleSeqs;
    Role(): ConceptCode;
    term(): ArticleTerm;
    defs(): IArticleDefine;
    static constToSumsArray(_codes: Iterable<number>): Iterable<ArticleCode>;
    static specsToSumsArray(_codes: Iterable<ISpecCode>): Iterable<ArticleCode>;
}
