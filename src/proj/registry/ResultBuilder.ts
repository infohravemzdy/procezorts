import {VersionCode} from "../service_types/VersionCode";
import {IPeriod, Period, IBundlePropsm} from "hravemzdy.legalios";
import {ArticleCode} from "../service_types/ArticleCode";
import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {IArticleSpecFactory} from "../registry_factories/IArticleSpecFactory";
import {IConceptSpecFactory} from "../registry_factories/IConceptSpecFactory";
import {ITermTarget} from "../service_interfaces/ITermTarget";
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

export interface IResultBuilder {
    Version: VersionCode;
    PeriodInit: IPeriod;
    ArticleOrder: Iterable<ArticleCode>;
    ArticlePaths: Map<ArticleCode, Iterable<IArticleDefine>>;
    InitWithPeriod(version: VersionCode,
                   period: IPeriod,
                   articleFactory: IArticleSpecFactory,
                   conceptFactory: IConceptSpecFactory): boolean;
    GetResults(ruleset: IBundlePropsm, targets: Iterable<ITermTarget>, finDefs: IArticleDefine): BuilderResultList;
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
        function (array: Array<[ArticleCode, Iterable<IArticleDefine>]>, item: ArticleCode):
            [ArticleCode, Iterable<IArticleDefine>] | undefined {
        return array.find(x => (x[0].value == item.value));
    };
    private TargetCompare(articleOrder: Array<ArticleCode>): (x: ITermTarget, y: ITermTarget) => number {
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
            const xIndex = articleOrder.findIndex(finderFun(x));

            const yIndex = articleOrder.findIndex(finderFun(y));

            return compareTo(xIndex, yIndex);
        }
    }

    Version: VersionCode = VersionCode.new();
    PeriodInit: IPeriod = Period.new();
    ArticleOrder: Array<ArticleCode> = new Array<ArticleCode>();
    ArticlePaths: Map<ArticleCode, Iterable<IArticleDefine>> = new Map<ArticleCode, Iterable<IArticleDefine>>();

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
    GetResults(ruleset: IBundlePropsm, targets: Iterable<ITermTarget>, finDefs: IArticleDefine): BuilderResultList {

        const calculTargets = this.BuildCalculsList(this.PeriodInit, targets, finDefs);

        const calculResults = this.BuildResultsList(this.PeriodInit, ruleset, calculTargets);

        return calculResults;
    }
    private BuildCalculsList(period: IPeriod, targets: Iterable<ITermTarget>, finDefs: IArticleDefine): Iterable<ITermCalcul> {
        const finDefine: IArticleDefine = ArticleDefine.copy(finDefs);

        const targetsSpec: Iterable<ITermTarget> = this.AddFinDefToTargets(period, Array.from(targets), finDefine);

        const targetsStep: Iterable<ITermTarget> = this.AddExternToTargets(period, targetsSpec);

        const calculsList: Iterable<ITermCalcul> = this.AddTargetToCalculs(targetsStep);

        return calculsList;
    }
    private BuildResultsList(period: IPeriod, ruleset: IBundlePropsm, calculs: Iterable<ITermCalcul>): BuilderResultList {
        const reduceFunc = (agr: BuilderResultList, x: ITermCalcul, idx: number, array: Iterable<ITermCalcul>) =>
            this.MergeResults(agr, ...Array.from(x.GetResults(period, ruleset, agr)));
        const resultsInit: BuilderResultList = new Array<BuilderResult>();
        return Array.from(calculs).reduce<BuilderResultList>(reduceFunc, resultsInit);
    }
    private MergeResults(results: BuilderResultList, ...resultValues: BuilderResult[]): BuilderResultList {
        return Array.from(results).concat(...resultValues);
    }
    private AddFinDefToTargets(period: IPeriod, targets: Iterable<ITermTarget>, finDefs: IArticleDefine): Iterable<ITermTarget> {
        return this.MergeItemPendings(period, targets, finDefs);
    }
    private AddExternToTargets(period: IPeriod, targets: Iterable<ITermTarget>): Iterable<ITermTarget> {
        const reduceFunc = (agr: Iterable<ITermTarget>, item: ITermTarget, idx: number, array: Iterable<ITermTarget>) => {
            return this.MergePendings(period, agr, item);
        };
        const targetsInit = Array.from(targets);

        const targetList = Array.from(targets).reduce<Iterable<ITermTarget>>(reduceFunc, targetsInit);

        const targetSort = Array.from(targetList).sort(this.TargetCompare(this.ArticleOrder));

        return targetSort;
    }
    private AddTargetToCalculs(targets: Iterable<ITermTarget>): Iterable<ITermCalcul> {
        const targetsRets = Array.from(targets).map((x) => new TermCalcul(x, this.GetCalculFunc(this.ConceptModel, x.concept)));
        return targetsRets;
    }
    private MergePendings(period: IPeriod, init: Iterable<ITermTarget>, target: ITermTarget): Iterable<ITermTarget> {
        let resultList = Array.from(init);

        const pendingsSpec = this.firstOrDefaultPath(Array.from(this.ArticlePaths.entries()), target.article);

        if (pendingsSpec == undefined) {
            return resultList;
        }
        const pendingsPath = pendingsSpec[1];

        const reduceFunc = (agr: Iterable<ITermTarget>, def: IArticleDefine, idx: number, array: Iterable<IArticleDefine>) => {
            return this.MergeItemPendings(period, agr, def);
        };
        if (pendingsPath != undefined)
        {
            resultList =Array.from(Array.from(pendingsPath).reduce<Iterable<ITermTarget>>(reduceFunc, resultList));
        }
        return resultList;
    }
    private MergeItemPendings(period: IPeriod, init: Iterable<ITermTarget>, articleDefs: IArticleDefine): Iterable<ITermTarget> {
        const monthCode = MonthCode.get(period.code);

        const contract = ContractCode.new()
        const position = PositionCode.new()

        let resultList: Iterable<ITermTarget> = Array.from(init);

        const initTarget = this.firstOrDefaultTarget(Array.from(init), articleDefs.code);

        if (initTarget == null)
        {
            const variant = VariantCode.get(1);

            const resultItem = TermTarget.zero(monthCode, contract, position, variant, articleDefs.code, articleDefs.role)

            resultList = Array.from(resultList).concat(resultItem);
        }

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
    private NotFoundCalculFunc(target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundlePropsm, results: BuilderResultList): BuilderResultList {
        const resultError = TermResultError.CreateNoResultFuncError(period, target);
        return new Array<BuilderResult>(Result.err(resultError));
    }
}