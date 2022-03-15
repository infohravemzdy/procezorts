import { ICodeValue } from "../service_interfaces/ICodeValue";
export declare class ContractCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): ContractCode;
    static new(): ContractCode;
    static get(value: number): ContractCode;
}
