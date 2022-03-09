import {ExampleArticleConst, ExampleConceptConst} from "./ExampleConstants";
import {CODE} from "../../proj/registry_factories/SpecFactory";
import {ArticleSpecFactory, ProviderRecord} from "../../proj/registry_factories/ArticleSpecFactory";
import {IArticleSpecProvider} from "../../proj/registry_providers/IArticleSpecProvider";
import {ConceptSpecFactory} from "../../proj/registry_factories/ConceptSpecFactory";
import {IConceptSpecProvider} from "../../proj/registry_providers/IConceptSpecProvider";
import {
    AmountBasisConProv,
    AmountFixedConProv,
    HealthInsbaseConProv, HealthInspaymConProv, IncomeGrossConProv, IncomeNettoConProv, SocialInsbaseConProv,
    SocialInspaymConProv, TaxingAdvbaseConProv, TaxingAdvpaymConProv,
    TimeshtWorkingConProv
} from "./ExampleProviders";

export class ExampleArticleFactory extends ArticleSpecFactory {
    private static ARTICLE_DEFAULT_SEQUENS: number = 0;
    private providersConfig: Array<ProviderRecord> = [
        new ProviderRecord(ExampleArticleConst.ARTICLE_TIMESHT_WORKING, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_TIMESHT_WORKING,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_PAYMENT_SALARY, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_AMOUNT_BASIS,
            [
                ExampleArticleConst.ARTICLE_INCOME_GROSS,
                ExampleArticleConst.ARTICLE_HEALTH_INSBASE,
                ExampleArticleConst.ARTICLE_SOCIAL_INSBASE,
                ExampleArticleConst.ARTICLE_TAXING_ADVBASE,
            ]),
        new ProviderRecord(ExampleArticleConst.ARTICLE_PAYMENT_BONUS, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_AMOUNT_FIXED,
            [
                ExampleArticleConst.ARTICLE_INCOME_GROSS,
                ExampleArticleConst.ARTICLE_HEALTH_INSBASE,
                ExampleArticleConst.ARTICLE_SOCIAL_INSBASE,
                ExampleArticleConst.ARTICLE_TAXING_ADVBASE,
            ]),
        new ProviderRecord(ExampleArticleConst.ARTICLE_PAYMENT_BARTER, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_AMOUNT_FIXED,
            [
                ExampleArticleConst.ARTICLE_HEALTH_INSBASE,
                ExampleArticleConst.ARTICLE_SOCIAL_INSBASE,
                ExampleArticleConst.ARTICLE_TAXING_ADVBASE,
            ]),
        new ProviderRecord(ExampleArticleConst.ARTICLE_ALLOWCE_HOFFICE, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_AMOUNT_FIXED,
            [
                ExampleArticleConst.ARTICLE_INCOME_NETTO,
            ]),
        new ProviderRecord(ExampleArticleConst.ARTICLE_HEALTH_INSBASE, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_HEALTH_INSBASE,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_SOCIAL_INSBASE, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_SOCIAL_INSBASE,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_HEALTH_INSPAYM, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_HEALTH_INSPAYM,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_SOCIAL_INSPAYM, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_SOCIAL_INSPAYM,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_TAXING_ADVBASE, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_TAXING_ADVBASE,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_TAXING_ADVPAYM, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_TAXING_ADVPAYM,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_INCOME_GROSS, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_INCOME_GROSS,
            []),
        new ProviderRecord(ExampleArticleConst.ARTICLE_INCOME_NETTO, ExampleArticleFactory.ARTICLE_DEFAULT_SEQUENS, ExampleConceptConst.CONCEPT_INCOME_NETTO,
            []),
    ];

    override providers: Map<CODE, IArticleSpecProvider> = ArticleSpecFactory.BuildProvidersFromRecords(this.providersConfig);

    constructor() {
        super();
    }
}

export class ExampleConceptFactory extends ConceptSpecFactory {
    override providers: Map<CODE, IConceptSpecProvider> = new Map<CODE, IConceptSpecProvider>();

    constructor() {
        super();
        this.providers.set(ExampleConceptConst.CONCEPT_TIMESHT_WORKING, new TimeshtWorkingConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_AMOUNT_BASIS, new AmountBasisConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_AMOUNT_FIXED, new AmountFixedConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_HEALTH_INSBASE, new HealthInsbaseConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_SOCIAL_INSBASE, new SocialInsbaseConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_HEALTH_INSPAYM, new HealthInspaymConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_SOCIAL_INSPAYM, new SocialInspaymConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_TAXING_ADVBASE , new TaxingAdvbaseConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_TAXING_ADVPAYM, new TaxingAdvpaymConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_INCOME_GROSS, new IncomeGrossConProv());
        this.providers.set(ExampleConceptConst.CONCEPT_INCOME_NETTO, new IncomeNettoConProv());
    }
}