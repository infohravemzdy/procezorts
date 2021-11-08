import {ITermTarget} from "../../proj/service_interfaces/ITermTarget";
import {TermResult} from "../../proj/service_types/TermResult";
import {TermTarget} from "../../proj/service_types/TermTarget";
import {ArticleCode, ConceptCode, ContractCode, MonthCode, PositionCode, VariantCode} from "../../proj";
import {NameOfArticle, NameOfConcept} from "./ExampleConstants";

export class ExampleTermTarget extends TermTarget {
    constructor(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode,
                _concept: ConceptCode, _basis: number, _descr: string) {
        super(_month, _contract, _position, _variant, _article, _concept, _basis, _descr);
    }
    override articleDescr(): String {
        return NameOfArticle(this.article.value);
    }
    override conceptDescr(): String {
        return NameOfConcept(this.concept.value);
    }
    static zero(_month: MonthCode, _contract: ContractCode, _position: PositionCode, _variant: VariantCode, _article: ArticleCode, _concept: ConceptCode): ITermTarget {
        return new ExampleTermTarget(_month, _contract, _position, _variant, _article, _concept, 0, "");
    }
}

export class ExampleTermResult extends TermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }

    override articleDescr(): String {
        return NameOfArticle(this.article.value);
    }
    override conceptDescr(): String {
        return NameOfConcept(this.concept.value);
    }
}

export class TimeshtWorkingResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class AmountBasisResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class AmountFixedResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class HealthInsbaseResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class SocialInsbaseResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class HealthInspaymResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class SocialInspaymResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class TaxingAdvbaseResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class TaxingAdvpaymResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class IncomeGrossResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

export class IncomeNettoResult extends ExampleTermResult {
    constructor(target: ITermTarget, value: number, basis: number, descr: string) {
        super(target, value, basis, descr);
    }
}

