import { ISpecCode } from "../service_interfaces/ISpecCode";
export declare class ConceptCode implements ISpecCode {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): ConceptCode;
    static new(): ConceptCode;
    static get(value: number): ConceptCode;
}
