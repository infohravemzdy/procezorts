import {ISpecCode} from "../service_interfaces/ISpecCode";

export class ConceptCode implements ISpecCode {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static new(): ConceptCode {return new ConceptCode(ConceptCode.ZERO_VALUE); }
    static get(value: number): ConceptCode {return new ConceptCode(value); }
}