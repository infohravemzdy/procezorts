import { ConceptCode } from "../service_types/ConceptCode";
import { ITermSymbol } from "./ITermSymbol";
export interface ITermTarget extends ITermSymbol {
    concept: ConceptCode;
    conceptDescr(): string;
}
export declare type ITermTargetList = Iterable<ITermTarget>;
