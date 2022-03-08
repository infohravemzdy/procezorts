import {BuilderResultList} from "../service_interfaces/ITermResult";
import {ITermTarget, ITermTargetList} from "./ITermTarget";
import {IPeriod, IBundleProps} from "hravemzdy.legalios";
import {IConceptDefine} from "./IConceptDefine";
import {ArticleCode} from "../service_types/ArticleCode";
import {IArticleSpec} from "./IArticleSpec";
import {MonthCode} from "../service_types/MonthCode";
import {VariantCode} from "../service_types/VariantCode";
import {IContractTerm} from "./IContractTerm";
import {IPositionTerm} from "./IPositionTerm";

export type ResultFunc = (target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList) => BuilderResultList;

export interface IConceptSpec extends IConceptDefine {
    path : Array<ArticleCode>;
    resultDelegate : ResultFunc;
    defaultTargetList(article: ArticleCode, period: IPeriod, ruleset: IBundleProps, month: MonthCode,
                      contractTerms: Array<IContractTerm>, positionTerms: Array<IPositionTerm>,
                      targets: ITermTargetList, vars: VariantCode) : ITermTargetList;
}