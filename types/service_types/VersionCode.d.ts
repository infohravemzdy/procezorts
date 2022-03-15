import { ICodeValue } from "../service_interfaces/ICodeValue";
export declare class VersionCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): VersionCode;
    static new(): VersionCode;
    static get(value: number): VersionCode;
}
