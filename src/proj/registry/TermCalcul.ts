import {ITermTarget} from "../service_interfaces/ITermTarget";
import {ResultFunc} from "../service_interfaces/IConceptSpec";
import {TermSymbol} from "../service_types/TermSymbol";
import {IPeriod, IBundleProps} from "hravemzdy.legalios";
import {BuilderResultList} from "../service_interfaces/ITermResult";
import {TermResultError} from "../service_errors/TermResultError";
import {Result} from "@badrap/result";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";

export interface ITermCalcul {
    target: ITermTarget;
    spec: IArticleSpec;
    resultDelegate: ResultFunc;
    GetResults(period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList;
}

export class TermCalcul extends TermSymbol implements ITermCalcul {
    target: ITermTarget;
    spec: IArticleSpec;
    resultDelegate: ResultFunc;

    constructor(target: ITermTarget, spec: IArticleSpec, resultDelegate: ResultFunc) {
        super(target.monthCode, target.contract, target.position, target.variant, target.article);
        this.target = target;
        this.spec = spec;
        this.resultDelegate = resultDelegate;
    }

    GetResults(period: IPeriod, ruleset: IBundleProps, results: BuilderResultList): BuilderResultList {
        if (this.resultDelegate == null) {
            const resultError = TermResultError.CreateNoResultFuncError(period, this.target);
            return new Array(Result.err(resultError));
        }
        const resultTarget = this.resultDelegate(this.target, this.spec, period, ruleset, results);

        return Array.from(resultTarget);
    }
}