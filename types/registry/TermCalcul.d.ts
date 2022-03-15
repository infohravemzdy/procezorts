import { ITermTarget } from "../service_interfaces/ITermTarget";
import { ResultFunc } from "../service_interfaces/IConceptSpec";
import { TermSymbol } from "../service_types/TermSymbol";
import { IPeriod, IBundleProps } from "hravemzdy.legalios";
import { BuilderResultList } from "../service_interfaces/ITermResult";
import { IArticleSpec } from "../service_interfaces/IArticleSpec";
export interface ITermCalcul {
    target: ITermTarget;
    spec: IArticleSpec;
    resultDelegate: ResultFunc;
    GetResults(period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList;
}
export declare class TermCalcul extends TermSymbol implements ITermCalcul {
    target: ITermTarget;
    spec: IArticleSpec;
    resultDelegate: ResultFunc;
    constructor(target: ITermTarget, spec: IArticleSpec, resultDelegate: ResultFunc);
    GetResults(period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList;
}
