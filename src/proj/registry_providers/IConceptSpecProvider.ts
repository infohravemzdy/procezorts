import {ISpecProvider} from "./ISpecProvider";
import {IConceptSpec} from "../service_interfaces/IConceptSpec";
import {ConceptCode} from "../service_types/ConceptCode";

export interface IConceptSpecProvider extends ISpecProvider<IConceptSpec, ConceptCode> {
}