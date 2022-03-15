import {IArticleSpecProvider} from "./IArticleSpecProvider";
import {ArticleCode} from "../service_types/ArticleCode";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {ConceptCode} from "../service_types/ConceptCode";

export abstract class ArticleSpecProvider implements IArticleSpecProvider {
    code: ArticleCode;

    constructor(_code: ArticleCode) {
        this.code = _code;
    }

    Code(): ArticleCode {
        return this.code;
    }
    abstract GetSpec(period: IPeriod, version: VersionCode): IArticleSpec;
}