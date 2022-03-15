import { VersionCode } from "../service_types/VersionCode";
import { IArticleDefine } from "../service_interfaces/IArticleDefine";
import { IPeriod, IBundleProps } from "hravemzdy.legalios";
import { ArticleCode } from "../service_types/ArticleCode";
import { ConceptCode } from "../service_types/ConceptCode";
import { IArticleSpec } from "../service_interfaces/IArticleSpec";
import { IConceptSpec } from "../service_interfaces/IConceptSpec";
import { ITermTargetList } from "../service_interfaces/ITermTarget";
import { BuilderResultList } from "../service_interfaces/ITermResult";
import { IArticleSpecFactory } from "../registry_factories/IArticleSpecFactory";
import { IConceptSpecFactory } from "../registry_factories/IConceptSpecFactory";
import { ArticleTerm } from "../service_types/ArticleTerm";
import { IContractTermList } from "../service_interfaces/IContractTerm";
import { IPositionTermList } from "../service_interfaces/IPositionTerm";
export interface IServiceProcezor {
    version: VersionCode;
    calcArticles: Iterable<ArticleCode>;
    BuilderOrder(): Iterable<ArticleTerm>;
    BuilderPaths(): Map<ArticleTerm, Iterable<IArticleDefine>>;
    GetContractTerms(period: IPeriod, targets: ITermTargetList): IContractTermList;
    GetPositionTerms(period: IPeriod, contracts: IContractTermList, targets: ITermTargetList): IPositionTermList;
    GetResults(period: IPeriod, ruleset: IBundleProps, targets: ITermTargetList): BuilderResultList;
    InitWithPeriod(period: IPeriod): boolean;
    BuildFactories(): boolean;
    GetArticleSpec(code: ArticleCode, period: IPeriod, version: VersionCode): IArticleSpec;
    GetConceptSpec(code: ConceptCode, period: IPeriod, version: VersionCode): IConceptSpec;
}
export declare abstract class ServiceProcezor implements IServiceProcezor {
    version: VersionCode;
    calcArticles: Iterable<ArticleCode>;
    private Builder;
    protected ArticleFactory: IArticleSpecFactory;
    protected ConceptFactory: IConceptSpecFactory;
    protected constructor(_version: number, _calcArticles: Iterable<ArticleCode>);
    BuilderOrder(): Iterable<ArticleTerm>;
    BuilderPaths(): Map<ArticleTerm, Iterable<IArticleDefine>>;
    GetContractTerms(period: IPeriod, targets: ITermTargetList): IContractTermList;
    GetPositionTerms(period: IPeriod, contracts: IContractTermList, targets: ITermTargetList): IPositionTermList;
    GetResults(period: IPeriod, ruleset: IBundleProps, targets: ITermTargetList): BuilderResultList;
    InitWithPeriod(period: IPeriod): boolean;
    BuildFactories(): boolean;
    GetArticleSpec(code: ArticleCode, period: IPeriod, version: VersionCode): IArticleSpec;
    GetConceptSpec(code: ConceptCode, period: IPeriod, version: VersionCode): IConceptSpec;
    abstract BuildArticleFactory(): boolean;
    abstract BuildConceptFactory(): boolean;
}
