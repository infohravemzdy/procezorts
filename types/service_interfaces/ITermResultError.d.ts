import { ITermTarget } from "./ITermTarget";
import { IPeriod } from "hravemzdy.legalios";
import { ContractCode } from "../service_types/ContractCode";
import { PositionCode } from "../service_types/PositionCode";
import { ArticleCode } from "../service_types/ArticleCode";
import { ConceptCode } from "../service_types/ConceptCode";
import { VariantCode } from "../service_types/VariantCode";
export interface ITermResultError extends Error {
    target: ITermTarget;
    period: IPeriod;
    contract: ContractCode;
    position: PositionCode;
    article: ArticleCode;
    concept: ConceptCode;
    variant: VariantCode;
    articleDescr(): string;
    conceptDescr(): string;
}
