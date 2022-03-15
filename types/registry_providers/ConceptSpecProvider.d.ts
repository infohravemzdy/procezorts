import { IConceptSpecProvider } from "./IConceptSpecProvider";
import { ConceptCode } from "../service_types/ConceptCode";
import { IPeriod } from "hravemzdy.legalios";
import { VersionCode } from "../service_types/VersionCode";
import { IConceptSpec } from "../service_interfaces/IConceptSpec";
export declare abstract class ConceptSpecProvider implements IConceptSpecProvider {
    code: ConceptCode;
    constructor(_code: ConceptCode);
    abstract GetSpec(period: IPeriod, version: VersionCode): IConceptSpec;
    Code(): ConceptCode;
}
