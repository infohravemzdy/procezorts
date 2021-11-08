import {ServiceProcezor} from "../../proj/service/ServiceProcezor";
import {ExampleArticleConst, ExampleConceptConst} from "./ExampleConstants";
import {IArticleDefine} from "../../proj/service_interfaces/IArticleDefine";
import {ArticleDefine} from "../../proj/service_types/ArticleDafine";
import {ExampleArticleFactory, ExampleConceptFactory} from "./ExampleFactories";

export class ServiceExample extends ServiceProcezor {
    private static readonly TEST_VERSION: number = 100;
    private static readonly TEST_FINAL_ARTICLE: number = ExampleArticleConst.ARTICLE_INCOME_NETTO;
    private static readonly TEST_FINAL_CONCEPT: number = ExampleConceptConst.CONCEPT_INCOME_NETTO;

    private static readonly TEST_FINAL_DEFS: IArticleDefine =
        ArticleDefine.get(ServiceExample.TEST_FINAL_ARTICLE, ServiceExample.TEST_FINAL_CONCEPT);

    constructor() {
        super(ServiceExample.TEST_VERSION, ServiceExample.TEST_FINAL_DEFS);
    }

    BuildArticleFactory(): boolean {
        this.ArticleFactory = new ExampleArticleFactory()

        return true;
    }

    BuildConceptFactory(): boolean {
        this.ConceptFactory = new ExampleConceptFactory()

        return true;
    }
}