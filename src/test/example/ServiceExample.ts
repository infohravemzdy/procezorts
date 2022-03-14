import {ServiceProcezor} from "../../proj/service/ServiceProcezor";
import {ExampleArticleConst} from "./ExampleConstants";
import {ExampleArticleFactory, ExampleConceptFactory} from "./ExampleFactories";
import {ArticleCode} from "../../proj";

export class ServiceExample extends ServiceProcezor {
    private static readonly TEST_VERSION: number = 100;
    private static readonly TEST_FINAL_ARTICLE: number = ExampleArticleConst.ARTICLE_INCOME_NETTO;

    private static readonly TEST_CALCS_ARTICLE: Iterable<ArticleCode> =
        [ArticleCode.get(ServiceExample.TEST_FINAL_ARTICLE)];

    constructor() {
        super(ServiceExample.TEST_VERSION, ServiceExample.TEST_CALCS_ARTICLE);

        const buildSuccess = this.BuildFactories();
        if (buildSuccess == false) {
            console.log(`Version: ${this.version}, build factories failed`);
        }
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