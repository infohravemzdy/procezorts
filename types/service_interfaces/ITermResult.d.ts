import { Result } from '@badrap/result';
import { ITermResultError } from "./ITermResultError";
import { ITermSymbol } from "./ITermSymbol";
import { ConceptCode } from "../service_types/ConceptCode";
import { ITermTarget } from "./ITermTarget";
import { IArticleSpec } from "./IArticleSpec";
export interface ITermResult extends ITermSymbol {
    target: ITermTarget;
    concept: ConceptCode;
    spec: IArticleSpec;
    conceptDescr(): string;
}
export declare type BuilderResult = Result<ITermResult, ITermResultError>;
export declare type BuilderResultList = Iterable<BuilderResult>;
