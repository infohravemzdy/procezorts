import {IConceptSpecProvider} from "./IConceptSpecProvider";
import {ConceptCode} from "../service_types/ConceptCode";
import {IPeriod} from "hravemzdy.legalios/dist";
import {VersionCode} from "../service_types/VersionCode";
import {IConceptSpec} from "../service_interfaces/IConceptSpec";

export abstract class ConceptSpecProvider implements IConceptSpecProvider {
    code: ConceptCode;

    constructor(_code: ConceptCode) {
        this.code = _code;
    }

    abstract GetSpec(period: IPeriod, version: VersionCode): IConceptSpec

}