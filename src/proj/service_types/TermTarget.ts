import {TermSymbol} from "./TermSymbol";
import {ITermTarget} from "../service_interfaces/ITermTarget";
import {ConceptCode} from "./ConceptCode";
import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {MonthCode} from "./MonthCode";
import {ContractCode} from "./ContractCode";
import {PositionCode} from "./PositionCode";
import {VariantCode} from "./VariantCode";
import {ArticleCode} from "./ArticleCode";
import {ArticleDefine} from "./ArticleDafine";

export class TermTarget extends TermSymbol implements ITermTarget {
    concept: ConceptCode;
    targetBasis: number;
    targetDescr: string;

    constructor(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode,
                _concept: ConceptCode, _basis: number, _descr: string) {
        super(_month, _contract, _position, _variant, _article);

        this.concept = _concept
        this.targetBasis = _basis
        this.targetDescr = _descr
    }

    get_defs(): IArticleDefine {
        return new ArticleDefine(this.article, this.concept);
    }

    conceptDescr(): String {
        return "";
    }

    static zero(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode, _concept: ConceptCode): ITermTarget {
        return new TermTarget(_month, _contract, _position, _variant, _article, _concept, 0, "");
    }
}