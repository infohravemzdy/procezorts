import { ITermSymbol } from "../service_interfaces/ITermSymbol";
import { ContractCode } from "./ContractCode";
import { PositionCode } from "./PositionCode";
import { VariantCode } from "./VariantCode";
import { ArticleCode } from "./ArticleCode";
import { MonthCode } from "./MonthCode";
export declare class TermSymbol implements ITermSymbol {
    monthCode: MonthCode;
    contract: ContractCode;
    position: PositionCode;
    variant: VariantCode;
    article: ArticleCode;
    constructor(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode);
    articleDescr(): string;
    static new(): TermSymbol;
}
