import {IArticleDefine} from "./IArticleDefine";
import {ArticleCode} from "../service_types/ArticleCode";
import {ArticleTerm} from "../service_types/ArticleTerm";

export interface IArticleSpec extends IArticleDefine {
    sums: ArticleCode[];
    defs() : IArticleDefine;
}