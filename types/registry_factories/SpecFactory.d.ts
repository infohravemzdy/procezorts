import { ISpecFactory } from "./ISpecFactory";
import { ISpecProvider } from "../registry_providers/ISpecProvider";
import { ISpecDefine } from "../service_interfaces/ISpecDefine";
import { ISpecCode } from "../service_interfaces/ISpecCode";
import { IPeriod } from "hravemzdy.legalios";
import { VersionCode } from "../service_types/VersionCode";
export declare type CODE = number;
export declare abstract class SpecFactory<P extends ISpecProvider<S, C>, S extends ISpecDefine<C>, C extends ISpecCode> implements ISpecFactory<P, S, C> {
    protected abstract providers: Map<CODE, P>;
    protected abstract notFoundProvider: P;
    protected abstract notFoundSpec: S;
    GetSpec(code: C, period: IPeriod, version: VersionCode): S;
    private GetProvider;
    GetSpecList(period: IPeriod, version: VersionCode): Iterable<S>;
}
