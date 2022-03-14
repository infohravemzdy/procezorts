import {CODE, ISpecFactory} from "./ISpecFactory";
import {ISpecProvider} from "../registry_providers/ISpecProvider";
import {ISpecDefine} from "../service_interfaces/ISpecDefine";
import {ISpecCode} from "../service_interfaces/ISpecCode";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";

export abstract class SpecFactory<P extends ISpecProvider<S, C>, S extends ISpecDefine<C>, C extends ISpecCode> implements ISpecFactory<P, S, C> {
    public providers: Map<CODE, P> = new Map<CODE, P>();
    protected abstract notFoundProvider: P
    protected abstract notFoundSpec: S

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of b04ee4e (Release 0.22.8.)
    protected constructor() {
    }

>>>>>>> parent of b04ee4e (Release 0.22.8.)
    GetSpec(code: C, period: IPeriod, version: VersionCode): S {
        const provider: P = this.GetProvider(code, this.notFoundProvider);
        if (provider === null) {
            return this.notFoundSpec;
        }
        return provider.GetSpec(period, version);
    }

    private GetProvider(code: C, defProvider: P): P {
        const hasProvider = this.providers.has(code.value);
        if (hasProvider === false) {
            return defProvider;
        }
        const provider = this.providers.get(code.value);

        return provider;
    }

    GetSpecList(period: IPeriod, version: VersionCode): Iterable<S> {
        return Array.from(this.providers.entries()).map(x => x[1].GetSpec(period, version));
    }
    AddProvider(code: CODE, prov: P): boolean {
        return false;
    }
}