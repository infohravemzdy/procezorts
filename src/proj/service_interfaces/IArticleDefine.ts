import {ArticleCode} from "../service_types/ArticleCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {ISpecDefine} from "./ISpecDefine";

export interface IArticleDefine extends ISpecDefine<ArticleCode> {
    role: ConceptCode
}