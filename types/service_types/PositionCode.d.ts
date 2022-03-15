import { ICodeValue } from "../service_interfaces/ICodeValue";
export declare class PositionCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): PositionCode;
    static new(): PositionCode;
    static get(value: number): PositionCode;
}
