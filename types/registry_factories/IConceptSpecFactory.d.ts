import { ISpecFactory } from "./ISpecFactory";
import { IConceptSpecProvider } from "../registry_providers/IConceptSpecProvider";
import { ConceptCode } from "../service_types/ConceptCode";
import { IConceptSpec } from "../service_interfaces/IConceptSpec";
export interface IConceptSpecFactory extends ISpecFactory<IConceptSpecProvider, IConceptSpec, ConceptCode> {
}
