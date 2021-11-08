import {ICodeValue} from "../service_interfaces/ICodeValue";

export class VariantCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static new(): VariantCode {return new VariantCode(VariantCode.ZERO_VALUE); }
    static get(value: number): VariantCode {return new VariantCode(value); }
}