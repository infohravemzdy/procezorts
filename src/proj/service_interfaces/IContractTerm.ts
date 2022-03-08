import {ContractCode} from "../service_types/ContractCode";

export interface IContractTerm {
    contract: ContractCode
    dateFrom: Date
    dateStop: Date
    termDayFrom: number
    termDayStop: number
    isActive(): Boolean
}