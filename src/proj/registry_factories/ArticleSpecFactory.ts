import {IArticleSpecFactory} from "./IArticleSpecFactory";
import {IArticleSpecProvider} from "../registry_providers/IArticleSpecProvider";
import {ArticleCode} from "../service_types/ArticleCode";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {SpecFactory} from "./SpecFactory";
import {ArticleSpec} from "../registry_providers/ArticleSpec";
import {ConceptConst} from "../registry_constants/ConceptConst";
import {ConceptCode} from "../service_types/ConceptCode";
import {ArticleSpecProvider} from "../registry_providers/ArticleSpecProvider";
import {ArticleConst} from "../registry_constants/ArticleConst";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";
import {ArticleProviderConfig} from "./ArticleProviderConfig";
import {ArticleSeqs} from "../service_types/ArticleSeqs";
import {IConceptSpecProvider} from "../registry_providers/IConceptSpecProvider";
import {CODE} from "./ISpecFactory";

class NotFoundArticleSpec extends ArticleSpec {
    static CONCEPT_CODE = ConceptConst.CONCEPT_NOTFOUND;
    constructor(_code: ArticleCode) {
        super(_code, ArticleSeqs.zero(), ConceptCode.get(NotFoundArticleSpec.CONCEPT_CODE), Array<ArticleCode>())
    }
    static new(): NotFoundArticleSpec {
        return new NotFoundArticleSpec(ArticleCode.get(NotFoundArticleProvider.ARTICLE_CODE));
    }
}

class NotFoundArticleProvider extends ArticleSpecProvider {
    static ARTICLE_CODE = ArticleConst.ARTICLE_NOTFOUND;
    constructor() {
        super(ArticleCode.get(NotFoundArticleProvider.ARTICLE_CODE))
    }

    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new NotFoundArticleSpec(this.code)
    }

}

export class ProviderRecord {
    article: number;
    sequens: number;
    concept: number;
    sums: Iterable<number>;

    constructor(_article: number, _sequens: number, _concept: number, _sums: Iterable<number>) {
        this.article = _article;
        this.sequens = _sequens;
        this.concept = _concept;
        this.sums = Array.from(_sums);
    }
}

export class ArticleSpecFactory extends SpecFactory<IArticleSpecProvider, IArticleSpec, ArticleCode> implements IArticleSpecFactory {
    override notFoundProvider = new NotFoundArticleProvider();
    override notFoundSpec = NotFoundArticleSpec.new();
    override providers = new Map<CODE, IArticleSpecProvider>();

    constructor() {
        super();
    }
    AddProvider(code: CODE, prov: IArticleSpecProvider): boolean {
        this.providers.set(code, prov);
        return true;
    }
    static BuildProvidersFromRecords(records: Iterable<ProviderRecord>): Map<CODE, IArticleSpecProvider> {
        const mapProviders: Map<CODE, IArticleSpecProvider> = new Map(Array.from(records).map(x => {
            return [x.article, new ArticleProviderConfig(x.article, x.sequens, x.concept, x.sums)];
        }));
        return mapProviders

    }
}