import {VersionCode} from "../service_types/VersionCode";
import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {IPeriod, IBundleProps} from "hravemzdy.legalios";
import {ArticleCode} from "../service_types/ArticleCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {IConceptSpec} from "../service_interfaces/IConceptSpec";
import {ITermTargetList} from "../service_interfaces/ITermTarget";
import {BuilderResult, BuilderResultList} from "../service_interfaces/ITermResult";
import {IResultBuilder, ResultBuilder} from "../registry/ResultBuilder";
import {IArticleSpecFactory} from "../registry_factories/IArticleSpecFactory";
import {IConceptSpecFactory} from "../registry_factories/IConceptSpecFactory";
import {ArticleDefine} from "../service_types/ArticleDafine";

export interface IServiceProcezor {
    version: VersionCode
    finDefs: IArticleDefine

    InitWithPeriod(period: IPeriod): Boolean
    BuildFactories(): Boolean
    GetResults(period: IPeriod, ruleset: IBundleProps, targets: ITermTargetList): BuilderResultList
    GetArticleSpec(code: ArticleCode, period: IPeriod, version: VersionCode): IArticleSpec
    GetConceptSpec(code: ConceptCode, period: IPeriod, version: VersionCode): IConceptSpec
}

export abstract class ServiceProcezor implements IServiceProcezor {
    version: VersionCode;
    finDefs: IArticleDefine;

    private Builder: IResultBuilder = new ResultBuilder();
    protected ArticleFactory: IArticleSpecFactory = null;
    protected ConceptFactory: IConceptSpecFactory = null;

    protected constructor(_version: number, _finDefs: IArticleDefine) {
        this.version = VersionCode.get(_version);
        this.finDefs = ArticleDefine.copy(_finDefs);
        this.BuildFactories();
    }
    GetResults(period: IPeriod, ruleset: IBundleProps, targets: ITermTargetList): BuilderResultList {
        let results: BuilderResultList = new Array<BuilderResult>();

        let success: boolean = this.InitWithPeriod(period);

        if (!success) {
            return results;
        }
        if (this.Builder != null) {
            results = this.Builder.GetResults(ruleset, targets, this.finDefs);
        }
        return results;
    }

    InitWithPeriod(period: IPeriod): boolean {
        let initResult: boolean = false;

        if (this.Builder != null) {
            initResult = true;
        }

        let initBuilder: boolean = false;

        if (this.Builder != null) {
            initBuilder = this.Builder.PeriodInit !== period;
        }

        if (initBuilder && this.ArticleFactory != null && this.ConceptFactory != null) {
            initResult = this.Builder.InitWithPeriod(this.version, period, this.ArticleFactory, this.ConceptFactory);
        }

        return initResult;
    }

    BuildFactories(): boolean {
        const articleFactorySuccess: boolean = this.BuildArticleFactory();

        const conceptFactorySuccess: boolean = this.BuildConceptFactory();

        return articleFactorySuccess && conceptFactorySuccess;
    }

    GetArticleSpec(code: ArticleCode, period: IPeriod, version: VersionCode): IArticleSpec {
        if  (this.ArticleFactory == null) {
            return null;
        }
        return this.ArticleFactory.GetSpec(code, period, version);
    }

    GetConceptSpec(code: ConceptCode, period: IPeriod, version: VersionCode): IConceptSpec {
        if  (this.ConceptFactory == null) {
            return null;
        }
        return this.ConceptFactory.GetSpec(code, period, version);
    }

    abstract BuildArticleFactory(): boolean

    abstract BuildConceptFactory(): boolean
}