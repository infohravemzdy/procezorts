import {IPeriod, IBundleProps} from "hravemzdy.legalios";
import {ConceptSpec} from "../../proj/registry_providers/ConceptSpec";
import {ConceptCode} from "../../proj/service_types/ConceptCode";
import {IConceptSpec} from "../../proj/service_interfaces/IConceptSpec";
import {ITermTarget} from "../../proj/service_interfaces/ITermTarget";
import {BuilderResultList, ITermResult} from "../../proj/service_interfaces/ITermResult";
import {ITermResultError} from "../../proj/service_interfaces/ITermResultError";
import {ConceptSpecProvider} from "../../proj/registry_providers/ConceptSpecProvider";
import {VersionCode} from "../../proj/service_types/VersionCode";
import {ExampleArticleConst, ExampleConceptConst} from "./ExampleConstants";
import {Result} from "@badrap/result";
import {
    AmountBasisResult, AmountFixedResult, HealthInsbaseResult,
    HealthInspaymResult,
    IncomeGrossResult, IncomeNettoResult, SocialInsbaseResult,
    SocialInspaymResult,
    TaxingAdvbaseResult,
    TaxingAdvpaymResult, TimeshtWorkingResult
} from "./ExampleResults";
import {ArticleCode, IArticleSpec} from "../../proj";

export class ExampleResultConst {
    public static readonly VALUE_ZERO: number = 0
    public static readonly BASIS_ZERO: number = 0
    public static readonly DESCRIPTION_EMPTY: string = "result from input value"
}

export class TimeshtWorkingConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_TIMESHT_WORKING;
    constructor() {
        super(ConceptCode.get(TimeshtWorkingConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new TimeshtWorkingConSpec(this.code);
    }
}

export class TimeshtWorkingConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        super(_code, Array<ArticleCode>(), TimeshtWorkingConSpec.ConceptEval);
    }
    static new(): TimeshtWorkingConSpec {
        return new TimeshtWorkingConSpec(ConceptCode.get(TimeshtWorkingConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new TimeshtWorkingResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class AmountBasisConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_AMOUNT_BASIS;
    constructor() {
        super(ConceptCode.get(AmountBasisConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new AmountBasisConSpec(this.code);
    }
}

export class AmountBasisConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        const _path: Array<number> = [
            ExampleArticleConst.ARTICLE_TIMESHT_WORKING,
        ];
        super(_code, ConceptSpec.constToPathArray(_path), AmountBasisConSpec.ConceptEval);
    }
    static new(): AmountBasisConSpec {
        return new AmountBasisConSpec(ConceptCode.get(AmountBasisConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new AmountBasisResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class AmountFixedConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_AMOUNT_FIXED;
    constructor() {
        super(ConceptCode.get(AmountFixedConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new AmountFixedConSpec(this.code);
    }
}

export class AmountFixedConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        super(_code, Array<ArticleCode>(), AmountFixedConSpec.ConceptEval);
    }
    static new(): AmountFixedConSpec {
        return new AmountFixedConSpec(ConceptCode.get(AmountFixedConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new AmountFixedResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class HealthInsbaseConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_HEALTH_INSBASE;
    constructor() {
        super(ConceptCode.get(HealthInsbaseConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new HealthInsbaseConSpec(this.code);
    }
}

export class HealthInsbaseConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        super(_code, Array<ArticleCode>(), HealthInsbaseConSpec.ConceptEval);
    }
    static new(): HealthInsbaseConSpec {
        return new HealthInsbaseConSpec(ConceptCode.get(HealthInsbaseConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new HealthInsbaseResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class SocialInsbaseConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_SOCIAL_INSBASE;
    constructor() {
        super(ConceptCode.get(SocialInsbaseConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new SocialInsbaseConSpec(this.code);
    }
}

export class SocialInsbaseConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        super(_code, Array<ArticleCode>(), SocialInsbaseConSpec.ConceptEval);
    }
    static new(): SocialInsbaseConSpec {
        return new SocialInsbaseConSpec(ConceptCode.get(SocialInsbaseConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new SocialInsbaseResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class HealthInspaymConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_HEALTH_INSPAYM;
    constructor() {
        super(ConceptCode.get(HealthInspaymConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new HealthInspaymConSpec(this.code);
    }
}

export class HealthInspaymConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        const _path: Array<number> = [
            ExampleArticleConst.ARTICLE_HEALTH_INSBASE,
        ];
        super(_code, ConceptSpec.constToPathArray(_path), HealthInspaymConSpec.ConceptEval);
    }
    static new(): HealthInspaymConSpec {
        return new HealthInspaymConSpec(ConceptCode.get(HealthInspaymConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new HealthInspaymResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class SocialInspaymConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_SOCIAL_INSPAYM;
    constructor() {
        super(ConceptCode.get(SocialInspaymConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new SocialInspaymConSpec(this.code);
    }
}

export class SocialInspaymConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        const _path: Array<number> = [
            ExampleArticleConst.ARTICLE_SOCIAL_INSBASE,
        ];
        super(_code, ConceptSpec.constToPathArray(_path), SocialInspaymConSpec.ConceptEval);
    }
    static new(): SocialInspaymConSpec {
        return new SocialInspaymConSpec(ConceptCode.get(SocialInspaymConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new SocialInspaymResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class TaxingAdvbaseConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_TAXING_ADVBASE;
    constructor() {
        super(ConceptCode.get(TaxingAdvbaseConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new TaxingAdvbaseConSpec(this.code);
    }
}

export class TaxingAdvbaseConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        super(_code, Array<ArticleCode>(), TaxingAdvbaseConSpec.ConceptEval);
    }
    static new(): TaxingAdvbaseConSpec {
        return new TaxingAdvbaseConSpec(ConceptCode.get(TaxingAdvbaseConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new TaxingAdvbaseResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class TaxingAdvpaymConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_TAXING_ADVPAYM;
    constructor() {
        super(ConceptCode.get(TaxingAdvpaymConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new TaxingAdvpaymConSpec(this.code);
    }
}

export class TaxingAdvpaymConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        const _path: Array<number> = [
            ExampleArticleConst.ARTICLE_TAXING_ADVBASE,
        ];
        super(_code, ConceptSpec.constToPathArray(_path), TaxingAdvpaymConSpec.ConceptEval);
    }
    static new(): TaxingAdvpaymConSpec {
        return new TaxingAdvpaymConSpec(ConceptCode.get(TaxingAdvpaymConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new TaxingAdvpaymResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class IncomeGrossConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_INCOME_GROSS;
    constructor() {
        super(ConceptCode.get(IncomeGrossConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new IncomeGrossConSpec(this.code);
    }
}

export class IncomeGrossConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        super(_code, Array<ArticleCode>(), IncomeGrossConSpec.ConceptEval);
    }
    static new(): IncomeGrossConSpec {
        return new IncomeGrossConSpec(ConceptCode.get(IncomeGrossConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new IncomeGrossResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

export class IncomeNettoConProv extends ConceptSpecProvider {
    static CONCEPT_CODE = ExampleConceptConst.CONCEPT_INCOME_NETTO;
    constructor() {
        super(ConceptCode.get(IncomeNettoConProv.CONCEPT_CODE));
    }
    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new IncomeNettoConSpec(this.code);
    }
}

export class IncomeNettoConSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        const _path: Array<number> = [
            ExampleArticleConst.ARTICLE_INCOME_GROSS,
            ExampleArticleConst.ARTICLE_HEALTH_INSPAYM,
            ExampleArticleConst.ARTICLE_SOCIAL_INSPAYM,
            ExampleArticleConst.ARTICLE_TAXING_ADVPAYM,
        ];
        super(_code, ConceptSpec.constToPathArray(_path), IncomeNettoConSpec.ConceptEval);
    }
    static new(): IncomeNettoConSpec {
        return new IncomeNettoConSpec(ConceptCode.get(IncomeNettoConProv.CONCEPT_CODE));
    }
    private static ConceptEval(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultsValues: ITermResult = new IncomeNettoResult(target, spec);

        return new Array(Result.ok<ITermResult, ITermResultError>(resultsValues));
    }
}

