import {ITermTarget} from "../service_interfaces/ITermTarget";
import {IPeriod} from "hravemzdy.legalios";
import {ITermResultError} from "../service_interfaces/ITermResultError";
import {ContractCode} from "../service_types/ContractCode";
import {PositionCode} from "../service_types/PositionCode";
import {ArticleCode} from "../service_types/ArticleCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {VariantCode} from "../service_types/VariantCode";

export class TermResultError extends Error implements ITermResultError {
    readonly target: ITermTarget;
    readonly period: IPeriod;
    readonly contract: ContractCode;
    readonly position: PositionCode;
    readonly article: ArticleCode;
    readonly concept: ConceptCode;
    readonly variant: VariantCode;

    constructor(period: IPeriod, target: ITermTarget, errorText: string) {
        super(`ResultError for ${errorText}`);
        this.target = target;
        this.period = period;
        this.contract = this.target?.contract ?? ContractCode.new();
        this.position = this.target?.position ?? PositionCode.new();
        this.article = this.target?.article ?? ArticleCode.new();
        this.concept = this.target?.concept ?? ConceptCode.new();
        this.variant = this.target?.variant ?? VariantCode.new();
    }
    articleDescr(): String {
        if (this.target == null) {
            return `ArticleCode for ${this.article.value}`
        }
        return this.target.articleDescr();
    }
    conceptDescr(): String {
        if (this.target == null) {
            return `ConceptCode for ${this.concept.value}`
        }
        return this.target.conceptDescr();
    }

    static CreateEvalResultError(period: IPeriod, target: ITermTarget): TermResultError {
        return new TermResultError(period, target, "evaluation failed");
    }
    static CreateExtractResultError(period: IPeriod, target: ITermTarget): TermResultError {
        return new TermResultError(period, target, "extract result failed");
    }
    static CreateNoImplementationError(period: IPeriod, target: ITermTarget): TermResultError {
        return new TermResultError(period, target, "failed with no-implementation");
    }
    static CreateNoResultFuncError(period: IPeriod, target: ITermTarget): TermResultError {
        return new TermResultError(period, target, "failed with no-result function");
    }
}

