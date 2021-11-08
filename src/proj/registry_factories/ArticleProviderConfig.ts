import {ArticleSpec} from "../registry_providers/ArticleSpec";
import {ArticleCode} from "../service_types/ArticleCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {ArticleSpecProvider} from "../registry_providers/ArticleSpecProvider";
import {IPeriod} from "hravemzdy.legalios/dist";
import {VersionCode} from "../service_types/VersionCode";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {ISpecCode} from "../service_interfaces/ISpecCode";
import {IArticleSpecProvider} from "../registry_providers/IArticleSpecProvider";

export class ArticleSpecConfig extends ArticleSpec {
    constructor(_code: number, _role: number, _sums: Iterable<number>) {
        super(ArticleCode.get(_code), ConceptCode.get(_role), ArticleSpec.constToSumsArray(_sums));
    }
    static specsToNumberSums(_codes: Iterable<ISpecCode>) : Iterable<number> {
        return Array.from(_codes).map(x => x.value);
    }
}

export class ArticleProviderConfig extends ArticleSpecProvider {
    readonly articleSpec: ArticleSpecConfig;

    constructor(article: number, concept: number, sums: Iterable<number>) {
        super(ArticleCode.get(article));
        this.articleSpec = new ArticleSpecConfig(article, concept, Array.from(sums));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return this.articleSpec;
    }
    static getSpecConfig(article: ISpecCode, concept: ISpecCode, sums: Iterable<ISpecCode>): IArticleSpecProvider {
        return new ArticleProviderConfig(article.value, concept.value, ArticleSpecConfig.specsToNumberSums(sums));
    }
    static getConstConfig(article: number, concept: number, sums: Iterable<number>): IArticleSpecProvider {
        return new ArticleProviderConfig(article, concept, sums);
    }
}

