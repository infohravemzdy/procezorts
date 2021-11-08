import {ICodeValue} from "../service_interfaces/ICodeValue";

export class ContractCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static new(): ContractCode {return new ContractCode(ContractCode.ZERO_VALUE); }
    static get(value: number): ContractCode {return new ContractCode(value); }
}