import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {ArticleCode} from "./ArticleCode";
import {ConceptCode} from "./ConceptCode";

export class ArticleDefine implements IArticleDefine {
    code: ArticleCode;
    role: ConceptCode;

    constructor(_code: ArticleCode, _role: ConceptCode) {
        this.code = _code;
        this.role = _role;
    }
    static new(): ArticleDefine {
        return new ArticleDefine(ArticleCode.new(), ConceptCode.new());
    }
    static copy(defs: IArticleDefine): ArticleDefine {
        return new ArticleDefine(defs.code, defs.role);
    }
    static get(_code: number, _role: number): ArticleDefine {
        return new ArticleDefine(ArticleCode.get(_code), ConceptCode.get(_role));
    }
}