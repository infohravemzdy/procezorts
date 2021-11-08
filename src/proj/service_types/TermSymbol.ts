import {ITermSymbol} from "../service_interfaces/ITermSymbol";
import {ContractCode} from "./ContractCode";
import {PositionCode} from "./PositionCode";
import {VariantCode} from "./VariantCode";
import {ArticleCode} from "./ArticleCode";
import {MonthCode} from "./MonthCode";

export class TermSymbol implements ITermSymbol {
    monthCode: MonthCode;
    contract: ContractCode;
    position: PositionCode;
    variant: VariantCode;
    article: ArticleCode;

    constructor(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode) {
        this.monthCode = _month;
        this.contract = _contract;
        this.position = _position;
        this.variant = _variant;
        this.article = _article;
    }
    articleDescr(): String {
        return `ArticleCode for ${this.article.value}`
    }

    static new(): TermSymbol {
        return new TermSymbol(MonthCode.new(), ContractCode.new(), PositionCode.new(), VariantCode.new(), ArticleCode.new());
    }
}