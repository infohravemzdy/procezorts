import { ContractCode } from "../service_types/ContractCode";
import { PositionCode } from "../service_types/PositionCode";
import { IContractTerm } from "./IContractTerm";
export interface IPositionTerm {
    contract: ContractCode;
    position: PositionCode;
    baseTerm: IContractTerm;
    dateFrom: Date;
    dateStop: Date;
    termDayFrom: number;
    termDayStop: number;
    isActive(): boolean;
}
export declare type IPositionTermList = Iterable<IPositionTerm>;
