import {ICodeValue} from "../service_interfaces/ICodeValue";

export class VersionCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static new(): VersionCode {return new VersionCode(VersionCode.ZERO_VALUE); }
    static get(value: number): VersionCode {return new VersionCode(value); }
}