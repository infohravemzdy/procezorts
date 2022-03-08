import {TermSymbol} from "./TermSymbol";
import {ITermTarget} from "../service_interfaces/ITermTarget";
import {ConceptCode} from "./ConceptCode";
import {MonthCode} from "./MonthCode";
import {ContractCode} from "./ContractCode";
import {PositionCode} from "./PositionCode";
import {VariantCode} from "./VariantCode";
import {ArticleCode} from "./ArticleCode";

export class TermTarget extends TermSymbol implements ITermTarget {
    concept: ConceptCode;

    constructor(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode,
                _concept: ConceptCode) {
        super(_month, _contract, _position, _variant, _article);

        this.concept = _concept
    }

    conceptDescr(): String {
        return "";
    }

    static zero(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode, _concept: ConceptCode): ITermTarget {
        return new TermTarget(_month, _contract, _position, _variant, _article, _concept);
    }
}