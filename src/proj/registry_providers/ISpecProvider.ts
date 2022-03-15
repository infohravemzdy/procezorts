import {ISpecCode} from "../service_interfaces/ISpecCode";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";
import {ConceptCode} from "../service_types/ConceptCode";

export interface ISpecProvider<S, C extends ISpecCode> {
    code: C;
    Code(): C;
    GetSpec(period: IPeriod, version: VersionCode): S
}