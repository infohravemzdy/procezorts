import {IArticleDefine} from "./IArticleDefine";
import {ArticleCode} from "../service_types/ArticleCode";

export interface IArticleSpec extends IArticleDefine {
    sums: Array<ArticleCode>;
    defs() : IArticleDefine;
}