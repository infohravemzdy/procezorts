import { ICodeValue } from "../service_interfaces/ICodeValue";
import { IPeriod } from "hravemzdy.legalios";
export declare class MonthCode implements ICodeValue<number> {
    static readonly ZERO_VALUE: number;
    value: number;
    constructor(code: number);
    static zero(): MonthCode;
    static new(): MonthCode;
    static get(value: number): MonthCode;
    static getWithPeriod(period: IPeriod): MonthCode;
}
