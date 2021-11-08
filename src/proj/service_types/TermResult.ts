import {TermSymbol} from "./TermSymbol";
import {ITermResult} from "../service_interfaces/ITermResult";
import {ConceptCode} from "./ConceptCode";
import {ITermTarget} from "../service_interfaces/ITermTarget";
import {MonthCode} from "./MonthCode";
import {ContractCode} from "./ContractCode";
import {PositionCode} from "./PositionCode";
import {VariantCode} from "./VariantCode";
import {ArticleCode} from "./ArticleCode";

export class TermResult extends TermSymbol implements ITermResult {
    target: ITermTarget;
    concept: ConceptCode;
    resultBasis: number;
    resultDescr: string;
    resultValue: number;

    constructor(_target: ITermTarget, _value: number, _basis: number, _descr: string) {
        super(MonthCode.new(), ContractCode.new(), PositionCode.new(), VariantCode.new(), ArticleCode.new());

        this.target = _target

        if (this.target != undefined) {
            this.monthCode = this.target.monthCode;
            this.contract = this.target.contract;
            this.position = this.target.position;
            this.variant = this.target.variant;
            this.article = this.target.article;
            this.concept = this.target.concept;
        }

        this.resultValue = _value;
        this.resultBasis = _basis;
        this.resultDescr = _descr;
    }

    conceptDescr(): String {
        return `ConceptCode for ${this.concept.value}`;
    }
}