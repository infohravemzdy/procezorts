import {IBundleProps} from "hravemzdy.legalios";
import {IConceptSpec, ResultFunc} from "../service_interfaces/IConceptSpec";
import {ConceptCode} from "../service_types/ConceptCode";
import {ArticleCode} from "../service_types/ArticleCode";
import {IPeriod} from "hravemzdy.legalios";
import {MonthCode} from "../service_types/MonthCode";
import {IContractTerm} from "../service_interfaces/IContractTerm";
import {IPositionTerm} from "../service_interfaces/IPositionTerm";
import {ITermTarget, ITermTargetList} from "../service_interfaces/ITermTarget";
import {VariantCode} from "../service_types/VariantCode";
import {ContractCode} from "../service_types/ContractCode";
import {PositionCode} from "../service_types/PositionCode";
import {TermTarget} from "../service_types/TermTarget";

export abstract class ConceptSpec implements IConceptSpec {
    code: ConceptCode;
    path: Array<ArticleCode>;
    resultDelegate : ResultFunc;

    protected constructor(_code: ConceptCode, _path: Iterable<ArticleCode>, _result: ResultFunc) {
        this.code = _code;
        this.path = Array.from(_path);
        this.resultDelegate = _result;
    }
    getMonthCode(period: IPeriod) : MonthCode {
        return MonthCode.get(period.code)
    }
    defaultTargetList(article: ArticleCode, period: IPeriod, ruleset: IBundleProps, month: MonthCode,
                      contractTerms: Iterable<IContractTerm>, positionTerms: Iterable<IPositionTerm>,
                      targets: ITermTargetList, vars: VariantCode) : ITermTargetList {
        const con = ContractCode.zero()
        const pos = PositionCode.zero()

        const targetsLength = Array(targets).length;
        if (targetsLength!=0) {
            return Array<ITermTarget>()
        }
        return Array<ITermTarget>(new TermTarget(month, con, pos, vars, article, this.code))
    }
    static constToPathArray(_codes: Iterable<number>) : Array<ArticleCode> {
        return Array.from(_codes).map(x => ArticleCode.get(x));
    }
}