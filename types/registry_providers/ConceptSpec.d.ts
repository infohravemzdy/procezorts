import { IBundleProps } from "hravemzdy.legalios";
import { IConceptSpec, ResultFunc } from "../service_interfaces/IConceptSpec";
import { ConceptCode } from "../service_types/ConceptCode";
import { ArticleCode } from "../service_types/ArticleCode";
import { IPeriod } from "hravemzdy.legalios";
import { MonthCode } from "../service_types/MonthCode";
import { IContractTermList } from "../service_interfaces/IContractTerm";
import { IPositionTermList } from "../service_interfaces/IPositionTerm";
import { ITermTargetList } from "../service_interfaces/ITermTarget";
import { VariantCode } from "../service_types/VariantCode";
export declare abstract class ConceptSpec implements IConceptSpec {
    code: ConceptCode;
    path: ArticleCode[];
    resultDelegate: ResultFunc;
    constructor(_code: ConceptCode, _path: Iterable<ArticleCode>, _result: ResultFunc);
    defaultTargetList(article: ArticleCode, period: IPeriod, ruleset: IBundleProps, month: MonthCode, contractTerms: IContractTermList, positionTerms: IPositionTermList, targets: ITermTargetList, vars: VariantCode): ITermTargetList;
    Code(): ConceptCode;
    static getMonthCode(period: IPeriod): MonthCode;
    static constToPathArray(_codes: Iterable<number>): ArticleCode[];
}
