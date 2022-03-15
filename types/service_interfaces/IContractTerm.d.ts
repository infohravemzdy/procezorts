import { ContractCode } from "../service_types/ContractCode";
export interface IContractTerm {
    contract: ContractCode;
    dateFrom: Date;
    dateStop: Date;
    termDayFrom: number;
    termDayStop: number;
    isActive(): boolean;
}
export declare type IContractTermList = Iterable<IContractTerm>;
