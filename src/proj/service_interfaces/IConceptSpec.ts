import {BuilderResultList} from "../service_interfaces/ITermResult";
import {ITermTarget} from "./ITermTarget";
import {IPeriod, IBundleProps} from "hravemzdy.legalios";
import {IConceptDefine} from "./IConceptDefine";
import {ArticleCode} from "../service_types/ArticleCode";

export type ResultFunc = (target: ITermTarget, period: IPeriod, ruleset: IBundleProps, results: BuilderResultList) => BuilderResultList;

export interface IConceptSpec extends IConceptDefine {
    path : Array<ArticleCode>;
    resultDelegate : ResultFunc;
}