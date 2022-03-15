import { IConceptSpecFactory } from "./IConceptSpecFactory";
import { ConceptSpec } from "../registry_providers/ConceptSpec";
import { ConceptConst } from "../registry_constants/ConceptConst";
import { ConceptCode } from "../service_types/ConceptCode";
import { ConceptSpecProvider } from "../registry_providers/ConceptSpecProvider";
import { IPeriod } from "hravemzdy.legalios";
import { VersionCode } from "../service_types/VersionCode";
import { IConceptSpec } from "../service_interfaces/IConceptSpec";
import { SpecFactory } from "./SpecFactory";
import { IConceptSpecProvider } from "../registry_providers/IConceptSpecProvider";
declare class NotFoundConceptSpec extends ConceptSpec {
    constructor(_code: ConceptCode);
    static new(): NotFoundConceptSpec;
}
declare class NotFoundConceptProvider extends ConceptSpecProvider {
    static CONCEPT_CODE: ConceptConst;
    constructor();
    GetSpec(period: IPeriod, version: VersionCode): IConceptSpec;
}
export declare abstract class ConceptSpecFactory extends SpecFactory<IConceptSpecProvider, IConceptSpec, ConceptCode> implements IConceptSpecFactory {
    notFoundProvider: NotFoundConceptProvider;
    notFoundSpec: NotFoundConceptSpec;
}
export {};
