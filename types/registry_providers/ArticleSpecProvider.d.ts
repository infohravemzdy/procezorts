import { IArticleSpecProvider } from "./IArticleSpecProvider";
import { ArticleCode } from "../service_types/ArticleCode";
import { IPeriod } from "hravemzdy.legalios";
import { VersionCode } from "../service_types/VersionCode";
import { IArticleSpec } from "../service_interfaces/IArticleSpec";
export declare abstract class ArticleSpecProvider implements IArticleSpecProvider {
    code: ArticleCode;
    constructor(_code: ArticleCode);
    Code(): ArticleCode;
    abstract GetSpec(period: IPeriod, version: VersionCode): IArticleSpec;
}
