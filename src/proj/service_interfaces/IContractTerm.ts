import {ContractCode} from "../service_types/ContractCode";
import {ITermTarget} from "./ITermTarget";

export interface IContractTerm {
    contract: ContractCode
    dateFrom: Date
    dateStop: Date
    termDayFrom: number
    termDayStop: number
    isActive(): boolean
}

export type IContractTermList = Iterable<IContractTerm>;
