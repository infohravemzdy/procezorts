import {ConceptCode} from "../service_types/ConceptCode";
import {IArticleDefine} from "./IArticleDefine";
import {ITermSymbol} from "./ITermSymbol";

export interface ITermTarget extends ITermSymbol {
    concept: ConceptCode
    targetBasis: number
    targetDescr: string
    get_defs(): IArticleDefine
    conceptDescr(): String
}

export type ITermTargetList = Iterable<ITermTarget>;