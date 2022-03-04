import {ISpecCode} from "../service_interfaces/ISpecCode";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";

export interface ISpecProvider<S, C extends ISpecCode> {
    code: C;
    GetSpec(period: IPeriod, version: VersionCode): S
}