import {VersionCode} from "../service_types/VersionCode";
import {IPeriod, Period, IBundleProps} from "hravemzdy.legalios";
import {ArticleCode} from "../service_types/ArticleCode";
import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {IArticleSpecFactory} from "../registry_factories/IArticleSpecFactory";
import {IConceptSpecFactory} from "../registry_factories/IConceptSpecFactory";
import {ITermTarget, ITermTargetList} from "../service_interfaces/ITermTarget";
import {BuilderResult, BuilderResultList} from "../service_interfaces/ITermResult";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {IConceptSpec, ResultFunc} from "../service_interfaces/IConceptSpec";
import {ITermCalcul, TermCalcul} from "./TermCalcul";
import {ConceptCode} from "../service_types/ConceptCode";
import {TermResultError} from "../service_errors/TermResultError";
import {Result} from "@badrap/result";
import {ArticleDefine} from "../service_types/ArticleDafine";
import {MonthCode} from "../service_types/MonthCode";
import {ContractCode} from "../service_types/ContractCode";
import {PositionCode} from "../service_types/PositionCode";
import {VariantCode} from "../service_types/VariantCode";
import {TermTarget} from "../service_types/TermTarget";
import { DependencyGraph } from "./DependencyGraph";
import {ArticleTerm} from "../service_types/ArticleTerm";
import {IContractTermList} from "../service_interfaces/IContractTerm";
import {IPositionTermList} from "../service_interfaces/IPositionTerm";

export interface IResultBuilder {
    Version: VersionCode;
    PeriodInit: IPeriod;
    InitWithPeriod(version: VersionCode,
                   period: IPeriod,
                   articleFactory: IArticleSpecFactory,
                   conceptFactory: IConceptSpecFactory): boolean;
    GetResults(ruleset: IBundleProps,
               contractTerms: IContractTermList, positionTerms: IPositionTermList,
               targets: ITermTargetList, calcArticles: Iterable<ArticleCode>): BuilderResultList;
    ArticleOrder: Iterable<ArticleTerm>;
    ArticlePaths: Map<ArticleTerm, Iterable<IArticleDefine>>;
}

export class ResultBuilder implements IResultBuilder {
    private firstOrDefaultConcept =
        function (array: Array<IConceptSpec>, item: ConceptCode):
            IConceptSpec | undefined {
        return array.find(x => (x.code.value == item.value));
    };
    private firstOrDefaultTarget =
        function (array: Array<ITermTarget>, item: ArticleCode):
            ITermTarget | undefined {
        return array.find(x => (x.article.value == item.value));
    };
    private firstOrDefaultPath =
        function (array: Array<[ArticleTerm, Iterable<IArticleDefine>]>, item: ArticleCode):
            [ArticleTerm, Iterable<IArticleDefine>] | undefined {
        return array.find(x => (x[0].code.value == item.value));
    };
    private TargetCompare(termOrder: Array<ArticleTerm>): (x: ITermTarget, y: ITermTarget) => number {
        const codeOrder: Array<ArticleCode> = termOrder.map(x => x.code);
        const compareTo = (xIndex: number, yIndex: number): number => {
            if (xIndex == -1 && yIndex == -1) {
                return 0;
            }
            if (xIndex == -1 && yIndex != -1) {
                return -1;
            }
            if (xIndex != -1 && yIndex == -1) {
                return 1;
            }
            if (xIndex > yIndex) {
                return 1;
            }
            if (xIndex < yIndex) {
                return -1;
            }
            return 0;
        };
        const finderFun = (target: ITermTarget): (x: ArticleCode) => boolean => {
            return (x: ArticleCode): boolean => {
                return x.value === target.article.value;
            };
        };
        return (x: ITermTarget, y: ITermTarget): number => {
            const xIndex = codeOrder.findIndex(finderFun(x));

            const yIndex = codeOrder.findIndex(finderFun(y));

            return compareTo(xIndex, yIndex);
        }
    }

    Version: VersionCode = VersionCode.new();
    PeriodInit: IPeriod = Period.new();
    ArticleOrder: Array<ArticleTerm> = new Array<ArticleTerm>();
    ArticlePaths: Map<ArticleTerm, Iterable<IArticleDefine>> = new Map<ArticleTerm, Iterable<IArticleDefine>>();

    private ArticleModel: Iterable<IArticleSpec> = new Array<IArticleSpec>();
    private ConceptModel: Iterable<IConceptSpec> = new Array<IConceptSpec>();

    InitWithPeriod(version: VersionCode,
                   period: IPeriod,
                   articleFactory: IArticleSpecFactory,
                   conceptFactory: IConceptSpecFactory): boolean {
        this.Version = version;
        this.PeriodInit = period;

        this.ArticleModel = articleFactory.GetSpecList(period, version);

        this.ConceptModel = conceptFactory.GetSpecList(period, version);

        const dependencyGraph = new DependencyGraph();

        [this.ArticleOrder, this.ArticlePaths] = dependencyGraph.InitGraphModel(this.ArticleModel, this.ConceptModel);

        return true
    }
    GetResults(ruleset: IBundleProps,
               contractTerms: IContractTermList, positionTerms: IPositionTermList,
               targets: ITermTargetList, calcArticles: Iterable<ArticleCode>): BuilderResultList {

        const calculTargets = this.BuildCalculsList(this.PeriodInit, ruleset,
            contractTerms, positionTerms, targets, calcArticles);

        const calculResults = this.BuildResultsList(this.PeriodInit, ruleset, calculTargets);

        return calculResults;
    }
    private BuildCalculsList(period: IPeriod, ruleset: IBundleProps,
                             contractTerms: IContractTermList, positionTerms: IPositionTermList,
                             targets: ITermTargetList, calcArticles: Iterable<ArticleCode>): Iterable<ITermCalcul> {
        const specDefines: Iterable<IArticleSpec> = Array.from(calcArticles)
            .map(a => Array.from(this.ArticleModel).find(m => m.code.value == a.value))

        const calcDefines = Array.from(specDefines).filter(s => (s != undefined))
            .map(x => ArticleDefine.get(x.code.value, x.seqs.value, x.role.value))

        const targetsSpec: ITermTargetList = this.AddFinDefToTargets(period, ruleset,
            contractTerms, positionTerms, Array.from(targets), calcDefines);

        const targetsStep: ITermTargetList = this.AddExternToTargets(period, ruleset,
            contractTerms, positionTerms, targetsSpec);

        const calculsList: Iterable<ITermCalcul> = this.AddTargetToCalculs(targetsStep);

        return calculsList;
    }
    private BuildResultsList(period: IPeriod, ruleset: IBundleProps, calculs: Iterable<ITermCalcul>): BuilderResultList {
        const reduceFunc = (agr: BuilderResultList, x: ITermCalcul, idx: number, array: Iterable<ITermCalcul>) =>
            this.MergeResults(agr, ...Array.from(x.GetResults(period, ruleset, agr)));
        const resultsInit: BuilderResultList = new Array<BuilderResult>();
        return Array.from(calculs).reduce<BuilderResultList>(reduceFunc, resultsInit);
    }
    private MergeResults(results: BuilderResultList, ...resultValues: BuilderResult[]): BuilderResultList {
        return Array.from(results).concat(...resultValues);
    }
    private AddFinDefToTargets(period: IPeriod, ruleset: IBundleProps,
                               contractTerms: IContractTermList, positionTerms: IPositionTermList,
                               targets: ITermTargetList, calcDefines: Iterable<IArticleDefine>): ITermTargetList {
        return this.MergeListPendings(period, ruleset, contractTerms, positionTerms, targets, calcDefines);
    }
    private AddExternToTargets(period: IPeriod, ruleset: IBundleProps,
                               contractTerms: IContractTermList, positionTerms: IPositionTermList,
                               targets: ITermTargetList): ITermTargetList {
        const reduceFunc = (agr: ITermTargetList, item: ITermTarget, idx: number, array: ITermTargetList) => {
            return this.MergePendings(period, ruleset, contractTerms, positionTerms, agr, item);
        };
        const targetsInit = Array.from(targets);

        const targetList = Array.from(targets).reduce<ITermTargetList>(reduceFunc, targetsInit);

        const targetSort = Array.from(targetList).sort(this.TargetCompare(this.ArticleOrder));

        return targetSort;
    }
    private AddDefinesToTargets(period: IPeriod, ruleset: IBundleProps,
                                    contractTerms: IContractTermList, positionTerms: IPositionTermList,
                                    targets: ITermTargetList, defines: Iterable<IArticleDefine>) : ITermTargetList {
        return Array.from(defines).flatMap(x =>
            Array.from<ITermTarget>(this.GetTargetList(period, ruleset, this.ConceptModel,
                contractTerms, positionTerms,
                Array.from(targets).filter(t => t.article == x.code), x.code, x.role)));
    }
    private AddTargetToCalculs(targets: ITermTargetList): Iterable<ITermCalcul> {
        const targetsRets = Array.from(targets).map((x) => {
            const articleSpec = Array.from(this.ArticleModel).find(a => a.code == x.article);
            return new TermCalcul(x, articleSpec, this.GetCalculFunc(this.ConceptModel, x.concept));
        });
        return targetsRets;
    }
    private MergePendings(period: IPeriod, ruleset: IBundleProps,
                          contractTerms: IContractTermList, positionTerms: IPositionTermList,
                          targets: ITermTargetList, target: ITermTarget): ITermTargetList {
        let resultList = Array.from(targets);

        const pendingsSpec = this.firstOrDefaultPath(Array.from(this.ArticlePaths.entries()), target.article);

        if (pendingsSpec == undefined) {
            return resultList;
        }
        const pendingsPath = pendingsSpec[1];

        const reduceFunc = (agr: ITermTargetList, def: IArticleDefine, idx: number, array: Iterable<IArticleDefine>) => {
            return this.MergeItemPendings(period, ruleset, contractTerms, positionTerms, agr, def);
        };
        if (pendingsPath != undefined)
        {
            resultList =Array.from(Array.from(pendingsPath).reduce<ITermTargetList>(reduceFunc, resultList));
        }
        return resultList;
    }
    private MergeItemPendings(period: IPeriod, ruleset: IBundleProps,
                              contractTerms: IContractTermList, positionTerms: IPositionTermList,
                              targets: ITermTargetList, articleDefs: IArticleDefine): ITermTargetList {
        let resultList: ITermTargetList = Array.from(targets);

        const initTargets = Array.from(targets).filter(x => x.article.value == articleDefs.code.value);

        const targetList = this.GetTargetList(period, ruleset, this.ConceptModel,
            contractTerms, positionTerms, initTargets, articleDefs.code, articleDefs.role);

        resultList = Array.from(resultList).concat(Array.from(targetList));

        return resultList;
    }
    private MergeListPendings(period: IPeriod, ruleset: IBundleProps,
                              contractTerms: IContractTermList, positionTerms: IPositionTermList,
                              targets: ITermTargetList, calcDefines: Iterable<IArticleDefine>): ITermTargetList {
        let resultList: ITermTargetList = Array.from(targets);

        const defineList = Array.from(calcDefines).filter(x => Array.from(targets).find(t => t.article == x.code) == undefined);

        const targetList = this.AddDefinesToTargets(period, ruleset, contractTerms, positionTerms, targets, defineList);

        resultList = Array.from(resultList).concat(Array.from(targetList));

        return resultList;
    }
    private GetCalculFunc(conceptsModel: Iterable<IConceptSpec>, concept: ConceptCode): ResultFunc {
        const conceptSpec = this.firstOrDefaultConcept(Array.from(conceptsModel), concept);

        if (conceptSpec == null)
        {
            return this.NotFoundCalculFunc;
        }
        return conceptSpec.resultDelegate;
    }
    private GetTargetList(period: IPeriod, ruleset: IBundleProps, conceptsModel: Iterable<IConceptSpec>,
                              contractTerms: IContractTermList, positionTerms: IPositionTermList,
                              targets: ITermTargetList, article: ArticleCode, concept: ConceptCode) : ITermTargetList {
        const monthCode = MonthCode.get(period.code)
        const variant = VariantCode.get(1)

        const conceptSpec = Array.from(conceptsModel).find(a => a.code.value == concept.value);
        if (conceptSpec == undefined) {
            const contract = ContractCode.new()
            const position = PositionCode.new()
            return [new TermTarget(monthCode, contract, position, variant, article, concept)];
        }
        return conceptSpec.defaultTargetList(article, period, ruleset, monthCode,
            contractTerms, positionTerms, targets, variant)
    }
    private NotFoundCalculFunc(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        const resultError = TermResultError.CreateNoResultFuncError(period, target);
        return new Array<BuilderResult>(Result.err(resultError));
    }
}