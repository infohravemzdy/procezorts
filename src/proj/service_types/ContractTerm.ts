import {IContractTerm} from "../service_interfaces/IContractTerm";
import {ContractCode} from "./ContractCode";
import {TermConstants} from "../registry_constants/TermConstants";

export class ContractTerm implements IContractTerm {
    contract: ContractCode;
    dateFrom: Date;
    dateStop: Date;
    termDayFrom: number;
    termDayStop: number;

    constructor(_con: ContractCode, _dateFrom: Date, _dateStop: Date, _termFrom: number, _termStop: number) {
        this.contract = _con;
        this.dateFrom = _dateFrom;
        this.dateStop = _dateStop;
        this.termDayFrom = _termFrom;
        this.termDayStop = _termStop;

    }
    isActive(): boolean {
        return (this.termDayFrom < TermConstants.TERM_BEG_FINISHED
            && this.termDayStop > TermConstants.TERM_END_FINISHED);
    }

}