import {IPeriod} from "hravemzdy.legalios/dist";
import {ArticleSpec} from "../../proj/registry_providers/ArticleSpec";
import {ArticleSpecProvider} from "../../proj/registry_providers/ArticleSpecProvider";
import {ArticleCode} from "../../proj/service_types/ArticleCode";
import {VersionCode} from "../../proj/service_types/VersionCode";
import {IArticleSpec} from "../../proj/service_interfaces/IArticleSpec";
import {ConceptCode} from "../../proj/service_types/ConceptCode";
import {ExampleArticleConst, ExampleConceptConst} from "./ExampleConstants";

export class TimeshtWorkingArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_TIMESHT_WORKING;
    constructor() {
        super(ArticleCode.get(TimeshtWorkingArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new TimeshtWorkingArtSpec(this.code);
    }
}

export class TimeshtWorkingArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_TIMESHT_WORKING;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(TimeshtWorkingArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): TimeshtWorkingArtSpec {
        return new TimeshtWorkingArtSpec(ArticleCode.get(TimeshtWorkingArtProv.ARTICLE_CODE));
    }
}

export class PaymentSalaryArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_PAYMENT_SALARY;
    constructor() {
        super(ArticleCode.get(PaymentSalaryArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new PaymentSalaryArtSpec(this.code);
    }
}

export class PaymentSalaryArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_AMOUNT_BASIS;
    constructor(_code: ArticleCode) {
        const _sums: Array<number> = [
            ExampleArticleConst.ARTICLE_INCOME_GROSS,
            ExampleArticleConst.ARTICLE_HEALTH_INSBASE,
            ExampleArticleConst.ARTICLE_SOCIAL_INSBASE,
            ExampleArticleConst.ARTICLE_TAXING_ADVBASE,
        ];
        super(_code, ConceptCode.get(PaymentSalaryArtSpec.CONCEPT_CODE), ArticleSpec.constToSumsArray(_sums));
    }
    static new(): PaymentSalaryArtSpec {
        return new PaymentSalaryArtSpec(ArticleCode.get(PaymentSalaryArtProv.ARTICLE_CODE));
    }
}

export class PaymentBonusArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_PAYMENT_BONUS;
    constructor() {
        super(ArticleCode.get(PaymentBonusArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new PaymentBonusArtSpec(this.code);
    }
}

export class PaymentBonusArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_AMOUNT_FIXED;
    constructor(_code: ArticleCode) {
        const _sums: Array<number> = [
            ExampleArticleConst.ARTICLE_INCOME_GROSS,
            ExampleArticleConst.ARTICLE_HEALTH_INSBASE,
            ExampleArticleConst.ARTICLE_SOCIAL_INSBASE,
            ExampleArticleConst.ARTICLE_TAXING_ADVBASE,
        ];
        super(_code, ConceptCode.get(PaymentBonusArtSpec.CONCEPT_CODE), ArticleSpec.constToSumsArray(_sums));
    }
    static new(): PaymentBonusArtSpec {
        return new PaymentBonusArtSpec(ArticleCode.get(PaymentBonusArtProv.ARTICLE_CODE));
    }
}

export class PaymentBarterArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_PAYMENT_BARTER;
    constructor() {
        super(ArticleCode.get(PaymentBarterArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new PaymentBarterArtSpec(this.code);
    }
}

export class PaymentBarterArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_AMOUNT_FIXED;
    constructor(_code: ArticleCode) {
        const _sums: Array<number> = [
            ExampleArticleConst.ARTICLE_HEALTH_INSBASE,
            ExampleArticleConst.ARTICLE_SOCIAL_INSBASE,
            ExampleArticleConst.ARTICLE_TAXING_ADVBASE,
        ];
        super(_code, ConceptCode.get(PaymentBarterArtSpec.CONCEPT_CODE), ArticleSpec.constToSumsArray(_sums));
    }
    static new(): PaymentBarterArtSpec {
        return new PaymentBarterArtSpec(ArticleCode.get(PaymentBarterArtProv.ARTICLE_CODE));
    }
}

export class AllowceHofficeArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_ALLOWCE_HOFFICE;
    constructor() {
        super(ArticleCode.get(AllowceHofficeArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new AllowceHofficeArtSpec(this.code);
    }
}

export class AllowceHofficeArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_AMOUNT_FIXED;
    constructor(_code: ArticleCode) {
        const _sums: Array<number> = [
            ExampleArticleConst.ARTICLE_INCOME_NETTO,
        ];
        super(_code, ConceptCode.get(AllowceHofficeArtSpec.CONCEPT_CODE), ArticleSpec.constToSumsArray(_sums));
    }
    static new(): AllowceHofficeArtSpec {
        return new AllowceHofficeArtSpec(ArticleCode.get(AllowceHofficeArtProv.ARTICLE_CODE));
    }
}

export class HealthInsbaseArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_HEALTH_INSBASE;
    constructor() {
        super(ArticleCode.get(HealthInsbaseArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new HealthInsbaseArtSpec(this.code);
    }
}

export class HealthInsbaseArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_HEALTH_INSBASE;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(HealthInsbaseArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): HealthInsbaseArtSpec {
        return new HealthInsbaseArtSpec(ArticleCode.get(HealthInsbaseArtProv.ARTICLE_CODE));
    }
}

export class SocialInsbaseArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_SOCIAL_INSBASE;
    constructor() {
        super(ArticleCode.get(SocialInsbaseArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new SocialInsbaseArtSpec(this.code);
    }
}

export class SocialInsbaseArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_SOCIAL_INSBASE;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(SocialInsbaseArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): SocialInsbaseArtSpec {
        return new SocialInsbaseArtSpec(ArticleCode.get(SocialInsbaseArtProv.ARTICLE_CODE));
    }
}

export class HealthInspaymArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_HEALTH_INSPAYM;
    constructor() {
        super(ArticleCode.get(HealthInspaymArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new HealthInspaymArtSpec(this.code);
    }
}

export class HealthInspaymArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_HEALTH_INSPAYM;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(HealthInspaymArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): HealthInspaymArtSpec {
        return new HealthInspaymArtSpec(ArticleCode.get(HealthInspaymArtProv.ARTICLE_CODE));
    }
}

export class SocialInspaymArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_SOCIAL_INSPAYM;
    constructor() {
        super(ArticleCode.get(SocialInspaymArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new SocialInspaymArtSpec(this.code);
    }
}

export class SocialInspaymArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_SOCIAL_INSPAYM;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(SocialInspaymArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): SocialInspaymArtSpec {
        return new SocialInspaymArtSpec(ArticleCode.get(SocialInspaymArtProv.ARTICLE_CODE));
    }
}

export class TaxingAdvbaseArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_TAXING_ADVBASE;
    constructor() {
        super(ArticleCode.get(TaxingAdvbaseArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new TaxingAdvbaseArtSpec(this.code);
    }
}

export class TaxingAdvbaseArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_TAXING_ADVBASE;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(TaxingAdvbaseArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): TaxingAdvbaseArtSpec {
        return new TaxingAdvbaseArtSpec(ArticleCode.get(TaxingAdvbaseArtProv.ARTICLE_CODE));
    }
}

export class TaxingAdvpaymArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_TAXING_ADVPAYM;
    constructor() {
        super(ArticleCode.get(TaxingAdvpaymArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new TaxingAdvpaymArtSpec(this.code);
    }
}

export class TaxingAdvpaymArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_TAXING_ADVPAYM;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(TaxingAdvpaymArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): TaxingAdvpaymArtSpec {
        return new TaxingAdvpaymArtSpec(ArticleCode.get(TaxingAdvpaymArtProv.ARTICLE_CODE));
    }
}

export class IncomeGrossArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_INCOME_GROSS;
    constructor() {
        super(ArticleCode.get(IncomeGrossArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new IncomeGrossArtSpec(this.code);
    }
}

export class IncomeGrossArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_INCOME_GROSS;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(IncomeGrossArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): IncomeGrossArtSpec {
        return new IncomeGrossArtSpec(ArticleCode.get(IncomeGrossArtProv.ARTICLE_CODE));
    }
}

export class IncomeNettoArtProv extends ArticleSpecProvider {
    static ARTICLE_CODE = ExampleArticleConst.ARTICLE_INCOME_NETTO;
    constructor() {
        super(ArticleCode.get(IncomeNettoArtProv.ARTICLE_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IArticleSpec {
        return new IncomeNettoArtSpec(this.code);
    }
}

export class IncomeNettoArtSpec extends ArticleSpec {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_INCOME_NETTO;
    constructor(_code: ArticleCode) {
        super(_code, ConceptCode.get(IncomeNettoArtSpec.CONCEPT_CODE), Array<ArticleCode>());
    }
    static new(): IncomeNettoArtSpec {
        return new IncomeNettoArtSpec(ArticleCode.get(IncomeNettoArtProv.ARTICLE_CODE));
    }
}

