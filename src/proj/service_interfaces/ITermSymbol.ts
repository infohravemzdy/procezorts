import {ArticleCode} from "../service_types/ArticleCode";
import {MonthCode} from "../service_types/MonthCode";
import {ContractCode} from "../service_types/ContractCode";
import {PositionCode} from "../service_types/PositionCode";
import {VariantCode} from "../service_types/VariantCode";

export interface ITermSymbol {
    monthCode: MonthCode
    contract: ContractCode
    position: PositionCode
    variant: VariantCode
    article: ArticleCode
    articleDescr(): string
}