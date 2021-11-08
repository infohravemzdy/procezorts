import {ICodeValue} from "../service_interfaces/ICodeValue";

export class PositionCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static new(): PositionCode {return new PositionCode(PositionCode.ZERO_VALUE); }
    static get(value: number): PositionCode {return new PositionCode(value); }
}