import {BuilderResultList} from "../service_interfaces/ITermResult";
import {ITermTarget, ITermTargetList} from "./ITermTarget";
import {IPeriod, IBundleProps} from "hravemzdy.legalios";
import {IConceptDefine} from "./IConceptDefine";
import {ArticleCode} from "../service_types/ArticleCode";
import {IArticleSpec} from "./IArticleSpec";
import {MonthCode} from "../service_types/MonthCode";
import {VariantCode} from "../service_types/VariantCode";
import {IContractTermList} from "./IContractTerm";
import {IPositionTermList} from "./IPositionTerm";
import {ConceptCode} from "../service_types/ConceptCode";

export type ResultFunc = (target: ITermTarget, spec: IArticleSpec, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList) => BuilderResultList;

export interface IConceptSpec extends IConceptDefine {
    path : ArticleCode[];
    resultDelegate : ResultFunc;
    defaultTargetList(article: ArticleCode, period: IPeriod, ruleset: IBundleProps, month: MonthCode,
                      contractTerms: IContractTermList, positionTerms: IPositionTermList,
                      targets: ITermTargetList, vars: VariantCode) : ITermTargetList;
    Code(): ConceptCode;
}