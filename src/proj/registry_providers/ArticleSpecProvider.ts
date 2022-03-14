import {IArticleSpecProvider} from "./IArticleSpecProvider";
import {ArticleCode} from "../service_types/ArticleCode";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";

export class ArticleSpecProvider implements IArticleSpecProvider {
    code: ArticleCode;

    protected constructor(_code: ArticleCode) {
        this.code = _code;
    }

    GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return null;
    }
}