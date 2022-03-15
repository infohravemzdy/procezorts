import { IArticleSpecFactory } from "./IArticleSpecFactory";
import { IArticleSpecProvider } from "../registry_providers/IArticleSpecProvider";
import { ArticleCode } from "../service_types/ArticleCode";
import { IArticleSpec } from "../service_interfaces/IArticleSpec";
import { CODE, SpecFactory } from "./SpecFactory";
import { ArticleSpec } from "../registry_providers/ArticleSpec";
import { ConceptConst } from "../registry_constants/ConceptConst";
import { ArticleSpecProvider } from "../registry_providers/ArticleSpecProvider";
import { ArticleConst } from "../registry_constants/ArticleConst";
import { IPeriod } from "hravemzdy.legalios";
import { VersionCode } from "../service_types/VersionCode";
declare class NotFoundArticleSpec extends ArticleSpec {
    static CONCEPT_CODE: ConceptConst;
    constructor(_code: ArticleCode);
    static new(): NotFoundArticleSpec;
}
declare class NotFoundArticleProvider extends ArticleSpecProvider {
    static ARTICLE_CODE: ArticleConst;
    constructor();
    GetSpec(period: IPeriod, version: VersionCode): IArticleSpec;
}
export declare class ProviderRecord {
    article: number;
    sequens: number;
    concept: number;
    sums: Iterable<number>;
    constructor(_article: number, _sequens: number, _concept: number, _sums: Iterable<number>);
}
export declare abstract class ArticleSpecFactory extends SpecFactory<IArticleSpecProvider, IArticleSpec, ArticleCode> implements IArticleSpecFactory {
    notFoundProvider: NotFoundArticleProvider;
    notFoundSpec: NotFoundArticleSpec;
    static BuildProvidersFromRecords(records: Iterable<ProviderRecord>): Map<CODE, IArticleSpecProvider>;
}
export {};
