import { Result } from '@badrap/result';
import {ITermResultError} from "./ITermResultError";
import {ITermSymbol} from "./ITermSymbol";
import {ConceptCode} from "../service_types/ConceptCode";
import {ITermTarget} from "./ITermTarget";
import {IArticleSpec} from "./IArticleSpec";

export interface ITermResult extends ITermSymbol {
    target: ITermTarget;
    concept: ConceptCode;
    spec: IArticleSpec;
    conceptDescr(): String;
}

export type BuilderResult = Result<ITermResult, ITermResultError>

export type BuilderResultList = Iterable<BuilderResult>