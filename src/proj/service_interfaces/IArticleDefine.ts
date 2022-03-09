import {ArticleCode} from "../service_types/ArticleCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {ISpecDefine} from "./ISpecDefine";
import {ArticleSeqs} from "../service_types/ArticleSeqs";
import {ArticleTerm} from "../service_types/ArticleTerm";

export interface IArticleDefine extends ISpecDefine<ArticleCode> {
    seqs: ArticleSeqs;
    role: ConceptCode;
    term() : ArticleTerm;
}