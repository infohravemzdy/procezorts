import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {ArticleCode} from "./ArticleCode";
import {ConceptCode} from "./ConceptCode";
import {ArticleSeqs} from "./ArticleSeqs";
import {ArticleTerm} from "./ArticleTerm";

export class ArticleDefine implements IArticleDefine {
    code: ArticleCode;
    seqs: ArticleSeqs;
    role: ConceptCode;

    constructor(_code: ArticleCode, _seqs: ArticleSeqs, _role: ConceptCode) {
        this.code = _code;
        this.seqs = _seqs;
        this.role = _role;
    }
    Code(): ArticleCode {
        return this.code;
    }
    Seqs(): ArticleSeqs {
        return this.seqs;
    }
    Role(): ConceptCode {
        return this.role;
    }
    term(): ArticleTerm {
        return new ArticleTerm(this.code, this.seqs);
    }
    static new(): ArticleDefine {
        return new ArticleDefine(ArticleCode.new(), ArticleSeqs.new(), ConceptCode.new());
    }
    static copy(defs: IArticleDefine): ArticleDefine {
        return new ArticleDefine(defs.code, defs.seqs, defs.role);
    }
    static get(_code: number, _seqs: number, _role: number): ArticleDefine {
        return new ArticleDefine(ArticleCode.get(_code), ArticleSeqs.get(_seqs), ConceptCode.get(_role));
    }
}