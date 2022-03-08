import {TermSymbol} from "./TermSymbol";
import {ITermResult} from "../service_interfaces/ITermResult";
import {ConceptCode} from "./ConceptCode";
import {ITermTarget} from "../service_interfaces/ITermTarget";
import {MonthCode} from "./MonthCode";
import {ContractCode} from "./ContractCode";
import {PositionCode} from "./PositionCode";
import {VariantCode} from "./VariantCode";
import {ArticleCode} from "./ArticleCode";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";

export class TermResult extends TermSymbol implements ITermResult {
    target: ITermTarget;
    concept: ConceptCode;
    spec: IArticleSpec;

    constructor(_target: ITermTarget, _spec: IArticleSpec) {
        super(MonthCode.new(), ContractCode.new(), PositionCode.new(), VariantCode.new(), ArticleCode.new());

        this.target = _target;
        this.spec = _spec;

        if (this.target != undefined) {
            this.monthCode = this.target.monthCode;
            this.contract = this.target.contract;
            this.position = this.target.position;
            this.variant = this.target.variant;
            this.article = this.target.article;
            this.concept = this.target.concept;
        }
    }

    conceptDescr(): String {
        return `ConceptCode for ${this.concept.value}`;
    }
}