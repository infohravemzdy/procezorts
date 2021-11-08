import { Result } from '@badrap/result';
import {ITermResultError} from "./ITermResultError";
import {ITermSymbol} from "./ITermSymbol";
import {ConceptCode} from "../service_types/ConceptCode";
import {ITermTarget} from "./ITermTarget";

export interface ITermResult extends ITermSymbol {
    target: ITermTarget;
    concept: ConceptCode;
    resultDescr: string;
    resultBasis: number;
    resultValue: number;
    conceptDescr(): String;
}

export type BuilderResult = Result<ITermResult, ITermResultError>

export type BuilderResultList = Iterable<BuilderResult>