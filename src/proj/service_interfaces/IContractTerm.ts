import {ContractCode} from "../service_types/ContractCode";
import {ITermTarget} from "./ITermTarget";

export interface IContractTerm {
    contract: ContractCode
    dateFrom: Date
    dateStop: Date
    termDayFrom: number
    termDayStop: number
    isActive(): Boolean
}

export type IContractTermList = Iterable<IContractTerm>;
