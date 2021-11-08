import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {ArticleCode} from "../service_types/ArticleCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {ArticleDefine} from "../service_types/ArticleDafine";
import {ISpecCode} from "../service_interfaces/ISpecCode";

export abstract class ArticleSpec implements IArticleSpec {
    code: ArticleCode;
    role: ConceptCode;
    sums: Array<ArticleCode>;

    protected constructor(_code: ArticleCode, _role: ConceptCode, _sums: Iterable<ArticleCode>) {
        this.code = _code;
        this.role = _role;
        this.sums = Array.from(_sums);
    }

    defs(): IArticleDefine {
        return new ArticleDefine(this.code, this.role);
    }
    static constToSumsArray(_codes: Iterable<number>) : Iterable<ArticleCode> {
        return Array.from(_codes).map(x => ArticleCode.get(x));
    }
    static specsToSumsArray(_codes: Iterable<ISpecCode>) : Iterable<ArticleCode> {
        return Array.from(_codes).map(x => ArticleCode.get(x.value));
    }
}