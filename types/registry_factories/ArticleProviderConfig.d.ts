import { ArticleSpec } from "../registry_providers/ArticleSpec";
import { ArticleSpecProvider } from "../registry_providers/ArticleSpecProvider";
import { IPeriod } from "hravemzdy.legalios";
import { VersionCode } from "../service_types/VersionCode";
import { IArticleSpec } from "../service_interfaces/IArticleSpec";
import { ISpecCode } from "../service_interfaces/ISpecCode";
import { IArticleSpecProvider } from "../registry_providers/IArticleSpecProvider";
import { ISpecSeqs } from "../service_interfaces/ISpecSeqs";
export declare class ArticleSpecConfig extends ArticleSpec {
    constructor(_code: number, _seqs: number, _role: number, _sums: Iterable<number>);
    static specsToNumberSums(_codes: Iterable<ISpecCode>): Iterable<number>;
}
export declare class ArticleProviderConfig extends ArticleSpecProvider {
    readonly articleSpec: ArticleSpecConfig;
    constructor(article: number, sequens: number, concept: number, sums: Iterable<number>);
    GetSpec(period: IPeriod, version: VersionCode): IArticleSpec;
    static getSpecConfig(article: ISpecCode, sequens: ISpecSeqs, concept: ISpecCode, sums: Iterable<ISpecCode>): IArticleSpecProvider;
    static getConstConfig(article: number, sequens: number, concept: number, sums: Iterable<number>): IArticleSpecProvider;
}
