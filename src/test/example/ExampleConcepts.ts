import {TermResult} from "../../proj/service_types/TermResult";
import {TermTarget} from "../../proj/service_types/TermTarget";
import {ArticleCode} from "../../proj/service_types/ArticleCode";
import {ConceptCode} from "../../proj/service_types/ConceptCode";
import {ContractCode} from "../../proj/service_types/ContractCode";
import {IArticleSpec} from "../../proj/service_interfaces/IArticleSpec";
import {ITermTarget} from "../../proj/service_interfaces/ITermTarget";
import {MonthCode} from "../../proj/service_types/MonthCode";
import {PositionCode} from "../../proj/service_types/PositionCode";
import {VariantCode} from "../../proj/service_types/VariantCode";
import {NameOfArticle, NameOfConcept} from "./ExampleConstants";

export class ExampleTermTarget extends TermTarget {
    constructor(_month: MonthCode, _contract: ContractCode, _position: PositionCode,
                _variant: VariantCode, _article: ArticleCode, _concept: ConceptCode) {
        super(_month, _contract, _position, _variant, _article, _concept);
    }
    override articleDescr(): String {
        return NameOfArticle(this.article.value);
    }
    override conceptDescr(): String {
        return NameOfConcept(this.concept.value);
    }
    static zero(_month: MonthCode, _contract: ContractCode, _position: PositionCode,
                _variant: VariantCode, _article: ArticleCode, _concept: ConceptCode): ITermTarget {
        return new ExampleTermTarget(_month, _contract, _position, _variant, _article, _concept);
    }
}

export class ExampleTermResult extends TermResult {
    constructor(target: ITermTarget, spec: IArticleSpec) {
        super(target, spec);
    }

    override articleDescr(): String {
        return NameOfArticle(this.article.value);
    }
    override conceptDescr(): String {
        return NameOfConcept(this.concept.value);
    }
}

