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
import {ArticleTerm} from "../service_types/ArticleTerm";
import {IContractTermList} from "../service_interfaces/IContractTerm";
import {IPositionTermList} from "../service_interfaces/IPositionTerm";
import {logError} from "typings/dist/support/cli";

export interface IServiceProcezor {
    version: VersionCode;
    calcArticles: Iterable<ArticleCode>;

    BuilderOrder() : Iterable<ArticleTerm>;
    BuilderPaths() : Map<ArticleTerm, Iterable<IArticleDefine>>;

    GetContractTerms(period: IPeriod, targets: ITermTargetList) : IContractTermList;
    GetPositionTerms(period: IPeriod, contracts: IContractTermList, targets: ITermTargetList) : IPositionTermList;

    GetResults(period: IPeriod, ruleset: IBundleProps, targets: ITermTargetList): BuilderResultList;
    InitWithPeriod(period: IPeriod): boolean;
    BuildFactories(): boolean;
    GetArticleSpec(code: ArticleCode, period: IPeriod, version: VersionCode): IArticleSpec;
    GetConceptSpec(code: ConceptCode, period: IPeriod, version: VersionCode): IConceptSpec;
}

export class ServiceProcezor implements IServiceProcezor {
    version: VersionCode;
    calcArticles: Iterable<ArticleCode>;

    private Builder: IResultBuilder = new ResultBuilder();
    protected ArticleFactory: IArticleSpecFactory = null;
    protected ConceptFactory: IConceptSpecFactory = null;

    protected constructor(_version: number, _calcArticles: Iterable<ArticleCode>) {
        this.version = VersionCode.get(_version);
        this.calcArticles = Array.from(_calcArticles);
    }
    BuilderOrder() : Iterable<ArticleTerm> {
        return this.Builder.ArticleOrder
    }
    BuilderPaths() : Map<ArticleTerm, Iterable<IArticleDefine>> {
        return this.Builder.ArticlePaths
    }

    GetContractTerms(period: IPeriod, targets: ITermTargetList) : IContractTermList {
        return [];
    }
    GetPositionTerms(period: IPeriod, contracts: IContractTermList, targets: ITermTargetList) : IPositionTermList {
        return [];
    }
    GetResults(period: IPeriod, ruleset: IBundleProps, targets: ITermTargetList): BuilderResultList {
        let results: BuilderResultList = new Array<BuilderResult>();

        const success: boolean = this.InitWithPeriod(period);

        if (!success) {
            return results;
        }

        const contractTerms = this.GetContractTerms(period, targets);
        const positionTerms = this.GetPositionTerms(period, contractTerms, targets);

        if (this.Builder !== null) {
            results = this.Builder.GetResults(ruleset,
                contractTerms, positionTerms, targets, this.calcArticles);
        }
        return results;
    }

    InitWithPeriod(period: IPeriod): boolean {
        let initResult: boolean = false;

        if (this.Builder !== null) {
            initResult = true;
        }

        let initBuilder: boolean = false;

        if (this.Builder !== null) {
            initBuilder = this.Builder.PeriodInit !== period;
        }

        if (initBuilder && this.ArticleFactory !== null && this.ConceptFactory !== null) {
            initResult = this.Builder.InitWithPeriod(this.version, period, this.ArticleFactory, this.ConceptFactory);
        }

        if (initResult === false) {
            logError(`Period: ${period.code}, init with period failed`)
        }
        return initResult;
    }

    BuildFactories(): boolean {
        const articleFactorySuccess: boolean = this.BuildArticleFactory();

        const conceptFactorySuccess: boolean = this.BuildConceptFactory();

        if (!(articleFactorySuccess && conceptFactorySuccess)) {
            logError(`Version: ${this.version}, build factories failed`);
        }
        return articleFactorySuccess && conceptFactorySuccess;
    }

    GetArticleSpec(code: ArticleCode, period: IPeriod, version: VersionCode): IArticleSpec {
        if  (this.ArticleFactory === null) {
            return null;
        }
        return this.ArticleFactory.GetSpec(code, period, version);
    }

    GetConceptSpec(code: ConceptCode, period: IPeriod, version: VersionCode): IConceptSpec {
        if  (this.ConceptFactory === null) {
            return null;
        }
        return this.ConceptFactory.GetSpec(code, period, version);
    }

    BuildArticleFactory(): boolean {
        return false;
    }

    BuildConceptFactory(): boolean {
        return false;
    }
}