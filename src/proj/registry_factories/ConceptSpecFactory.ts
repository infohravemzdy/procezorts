import {IConceptSpecFactory} from "./IConceptSpecFactory";
import {ConceptSpec} from "../registry_providers/ConceptSpec";
import {ConceptConst} from "../registry_constants/ConceptConst";
import {ConceptCode} from "../service_types/ConceptCode";
import {ConceptSpecProvider} from "../registry_providers/ConceptSpecProvider";
import {IPeriod} from "hravemzdy.legalios";
import {VersionCode} from "../service_types/VersionCode";
import {IConceptSpec} from "../service_interfaces/IConceptSpec";
import {ArticleCode} from "../service_types/ArticleCode";
import {SpecFactory} from "./SpecFactory";
import {IConceptSpecProvider} from "../registry_providers/IConceptSpecProvider";
import {IArticleSpecProvider} from "../registry_providers/IArticleSpecProvider";
import {CODE} from "./ISpecFactory";

class NotFoundConceptSpec extends ConceptSpec {
    constructor(_code: ConceptCode) {
        super(_code, Array<ArticleCode>(), null);
    }
    static new(): NotFoundConceptSpec {
        return new NotFoundConceptSpec(ConceptCode.get(NotFoundConceptProvider.CONCEPT_CODE));
    }
}

class NotFoundConceptProvider extends ConceptSpecProvider {
    static CONCEPT_CODE = ConceptConst.CONCEPT_NOTFOUND;
    constructor() {
        super(ConceptCode.get(NotFoundConceptProvider.CONCEPT_CODE));
    }

    override GetSpec(period: IPeriod, version: VersionCode): IConceptSpec {
        return new NotFoundConceptSpec(this.code)
    }

}

export abstract class ConceptSpecFactory extends SpecFactory<IConceptSpecProvider, IConceptSpec, ConceptCode> implements IConceptSpecFactory {
    override notFoundProvider = new NotFoundConceptProvider();
    override notFoundSpec = NotFoundConceptSpec.new();
    override providers = new Map<CODE, IConceptSpecProvider>();

    protected constructor() {
        super();
    }
    AddProvider(code: CODE, prov: IConceptSpecProvider): boolean {
        this.providers.set(code, prov);
        return true;
    }
}