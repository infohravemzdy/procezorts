import {ArticleSpec} from "../registry_providers/ArticleSpec";
import {ArticleCode} from "../service_types/ArticleCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {ArticleSpecProvider} from "../registry_providers/ArticleSpecProvider";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {ISpecCode} from "../service_interfaces/ISpecCode";
import {IArticleSpecProvider} from "../registry_providers/IArticleSpecProvider";
import {ArticleSeqs} from "../service_types/ArticleSeqs";
import {ISpecSeqs} from "../service_interfaces/ISpecSeqs";

export class ArticleSpecConfig extends ArticleSpec {
    constructor(_code: number, _seqs: number, _role: number, _sums: Iterable<number>) {
        super(ArticleCode.get(_code), ArticleSeqs.get(_seqs), ConceptCode.get(_role), ArticleSpec.constToSumsArray(_sums));
    }
    static specsToNumberSums(_codes: Iterable<ISpecCode>) : Iterable<number> {
        return Array.from(_codes).map(x => x.value);
    }
}

export class ArticleProviderConfig extends ArticleSpecProvider {
    readonly articleSpec: ArticleSpecConfig;

    constructor(article: number, sequens: number, concept: number, sums: Iterable<number>) {
        super(ArticleCode.get(article));
        this.articleSpec = new ArticleSpecConfig(article, sequens, concept, Array.from(sums));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return this.articleSpec;
    }
    static getSpecConfig(article: ISpecCode, sequens: ISpecSeqs, concept: ISpecCode, sums: Iterable<ISpecCode>): IArticleSpecProvider {
        return new ArticleProviderConfig(article.value, sequens.value, concept.value, ArticleSpecConfig.specsToNumberSums(sums));
    }
    static getConstConfig(article: number, sequens: number, concept: number, sums: Iterable<number>): IArticleSpecProvider {
        return new ArticleProviderConfig(article, sequens, concept, sums);
    }
}

