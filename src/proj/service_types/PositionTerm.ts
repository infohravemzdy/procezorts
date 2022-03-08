import {IPositionTerm} from "../service_interfaces/IPositionTerm";
import {ContractCode} from "./ContractCode";
import {PositionCode} from "./PositionCode";
import {IContractTerm} from "../service_interfaces/IContractTerm";
import {TermConstants} from "../registry_constants/TermConstants";

export class PositionTerm implements IPositionTerm {
    contract: ContractCode;
    position: PositionCode;
    baseTerm: IContractTerm;
    dateFrom: Date;
    dateStop: Date;
    termDayFrom: number;
    termDayStop: number;

    constructor(_con: ContractCode, _pos: PositionCode,
                _baseTerm: IContractTerm,
                _dateFrom: Date, _dateStop: Date,
                _termFrom: number, _termStop: number) {
        this.contract = _con;
        this.position = _pos;
        this.baseTerm = _baseTerm;
        this.dateFrom = _dateFrom;
        this.dateStop = _dateStop;
        this.termDayFrom = _termFrom;
        this.termDayStop = _termStop;
    }
    isPositionActive(): Boolean {
        return (this.termDayFrom < TermConstants.TERM_BEG_FINISHED
                && this.termDayStop > TermConstants.TERM_END_FINISHED)
    }
    isActive(): Boolean {
        if (this.baseTerm != undefined) {
            return ((this.baseTerm)!.isActive() && this.isPositionActive())
        }
        return this.isPositionActive()
    }
}