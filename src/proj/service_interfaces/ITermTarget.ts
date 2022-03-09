import {ConceptCode} from "../service_types/ConceptCode";
import {IArticleDefine} from "./IArticleDefine";
import {ITermSymbol} from "./ITermSymbol";

export interface ITermTarget extends ITermSymbol {
    concept: ConceptCode
    conceptDescr(): String
}

export type ITermTargetList = Iterable<ITermTarget>;
