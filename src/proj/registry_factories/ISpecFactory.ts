import {ISpecProvider} from "../registry_providers/ISpecProvider";
import {ISpecDefine} from "../service_interfaces/ISpecDefine";
import {ISpecCode} from "../service_interfaces/ISpecCode";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";

export type CODE = number;

export interface ISpecFactory<P extends ISpecProvider<S, C>, S extends ISpecDefine<C>, C extends ISpecCode> {
    GetSpec(code: C, period: IPeriod, version: VersionCode): S;
    GetSpecList(period: IPeriod, version: VersionCode): Iterable<S>;
    AddProvider(code: CODE, prov: P): boolean;
}