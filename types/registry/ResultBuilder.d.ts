import { VersionCode } from "../service_types/VersionCode";
import { IPeriod, IBundleProps } from "hravemzdy.legalios";
import { ArticleCode } from "../service_types/ArticleCode";
import { IArticleDefine } from "../service_interfaces/IArticleDefine";
import { IArticleSpecFactory } from "../registry_factories/IArticleSpecFactory";
import { IConceptSpecFactory } from "../registry_factories/IConceptSpecFactory";
import { ITermTargetList } from "../service_interfaces/ITermTarget";
import { BuilderResultList } from "../service_interfaces/ITermResult";
import { ArticleTerm } from "../service_types/ArticleTerm";
import { IContractTermList } from "../service_interfaces/IContractTerm";
import { IPositionTermList } from "../service_interfaces/IPositionTerm";
export interface IResultBuilder {
    Version: VersionCode;
    PeriodInit: IPeriod;
    InitWithPeriod(version: VersionCode, period: IPeriod, articleFactory: IArticleSpecFactory, conceptFactory: IConceptSpecFactory): boolean;
    GetResults(ruleset: IBundleProps, contractTerms: IContractTermList, positionTerms: IPositionTermList, targets: ITermTargetList, calcArticles: Iterable<ArticleCode>): BuilderResultList;
    ArticleOrder: Iterable<ArticleTerm>;
    ArticlePaths: Map<ArticleTerm, Iterable<IArticleDefine>>;
}
export declare class ResultBuilder implements IResultBuilder {
    private firstOrDefaultConcept;
    private firstOrDefaultTarget;
    private firstOrDefaultPath;
    private TargetCompare;
    Version: VersionCode;
    PeriodInit: IPeriod;
    ArticleOrder: ArticleTerm[];
    ArticlePaths: Map<ArticleTerm, Iterable<IArticleDefine>>;
    private ArticleModel;
    private ConceptModel;
    InitWithPeriod(version: VersionCode, period: IPeriod, articleFactory: IArticleSpecFactory, conceptFactory: IConceptSpecFactory): boolean;
    GetResults(ruleset: IBundleProps, contractTerms: IContractTermList, positionTerms: IPositionTermList, targets: ITermTargetList, calcArticles: Iterable<ArticleCode>): BuilderResultList;
    private BuildCalculsList;
    private BuildResultsList;
    private MergeResults;
    private AddFinDefToTargets;
    private AddExternToTargets;
    private AddDefinesToTargets;
    private AddTargetToCalculs;
    private MergePendings;
    private MergeItemPendings;
    private MergeListPendings;
    private GetCalculFunc;
    private GetTargetList;
    private NotFoundCalculFunc;
}
