import {ICodeValue} from "../service_interfaces/ICodeValue";
import {IPeriod} from "hravemzdy.legalios";

export class MonthCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number = 0;
    value: number;

    constructor(code: number) {
        this.value = code;
    }
    static new(): MonthCode {return new MonthCode(MonthCode.ZERO_VALUE); }
    static get(value: number): MonthCode {return new MonthCode(value); }
    static getWithPeriod(period: IPeriod): MonthCode {return new MonthCode(period.code); }
}