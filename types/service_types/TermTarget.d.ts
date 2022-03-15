import { TermSymbol } from "./TermSymbol";
import { ITermTarget } from "../service_interfaces/ITermTarget";
import { ConceptCode } from "./ConceptCode";
import { MonthCode } from "./MonthCode";
import { ContractCode } from "./ContractCode";
import { PositionCode } from "./PositionCode";
import { VariantCode } from "./VariantCode";
import { ArticleCode } from "./ArticleCode";
export declare class TermTarget extends TermSymbol implements ITermTarget {
    concept: ConceptCode;
    constructor(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode, _concept: ConceptCode);
    conceptDescr(): string;
    static zero(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode, _concept: ConceptCode): ITermTarget;
}
