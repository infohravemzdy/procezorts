import { IPositionTerm } from "../service_interfaces/IPositionTerm";
import { ContractCode } from "./ContractCode";
import { PositionCode } from "./PositionCode";
import { IContractTerm } from "../service_interfaces/IContractTerm";
export declare class PositionTerm implements IPositionTerm {
    contract: ContractCode;
    position: PositionCode;
    baseTerm: IContractTerm;
    dateFrom: Date;
    dateStop: Date;
    termDayFrom: number;
    termDayStop: number;
    constructor(_con: ContractCode, _pos: PositionCode, _baseTerm: IContractTerm, _dateFrom: Date, _dateStop: Date, _termFrom: number, _termStop: number);
    isPositionActive(): boolean;
    isActive(): boolean;
}
