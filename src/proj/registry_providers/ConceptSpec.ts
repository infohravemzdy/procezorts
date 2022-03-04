import {IConceptSpec, ResultFunc} from "../service_interfaces/IConceptSpec";
import {ConceptCode} from "../service_types/ConceptCode";
import {ArticleCode} from "../service_types/ArticleCode";
import {ITermTarget} from "../service_interfaces/ITermTarget";
import {IPeriod} from "hravemzdy.legalios";
import {BuilderResultList} from "../service_interfaces/ITermResult";
import {MonthCode} from "../service_types/MonthCode";

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
    static constToPathArray(_codes: Iterable<number>) : Array<ArticleCode> {
        return Array.from(_codes).map(x => ArticleCode.get(x));
    }
}