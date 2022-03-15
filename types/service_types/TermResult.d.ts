import { TermSymbol } from "./TermSymbol";
import { ITermResult } from "../service_interfaces/ITermResult";
import { ConceptCode } from "./ConceptCode";
import { ITermTarget } from "../service_interfaces/ITermTarget";
import { IArticleSpec } from "../service_interfaces/IArticleSpec";
export declare class TermResult extends TermSymbol implements ITermResult {
    target: ITermTarget;
    concept: ConceptCode;
    spec: IArticleSpec;
    constructor(_target: ITermTarget, _spec: IArticleSpec);
    conceptDescr(): string;
}
