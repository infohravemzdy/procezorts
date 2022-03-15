import { IContractTerm } from "../service_interfaces/IContractTerm";
import { ContractCode } from "./ContractCode";
export declare class ContractTerm implements IContractTerm {
    contract: ContractCode;
    dateFrom: Date;
    dateStop: Date;
    termDayFrom: number;
    termDayStop: number;
    constructor(_con: ContractCode, _dateFrom: Date, _dateStop: Date, _termFrom: number, _termStop: number);
    isActive(): boolean;
}
