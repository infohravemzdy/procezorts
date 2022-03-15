import { ICodeValue } from "../service_interfaces/ICodeValue";
export declare class VariantCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): VariantCode;
    static new(): VariantCode;
    static get(value: number): VariantCode;
}
