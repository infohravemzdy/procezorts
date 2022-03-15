import { IArticleDefine } from "../service_interfaces/IArticleDefine";
import { IArticleSpec } from "../service_interfaces/IArticleSpec";
import { IConceptSpec } from "../service_interfaces/IConceptSpec";
import { ArticleTerm } from "../service_types/ArticleTerm";
export declare class DependencyGraph {
    private static firstOrDefaultCode;
    private static articleDefsDistinctSort;
    private static ArticleCodeDistinct;
    private static firstOrDefaultArticle;
    private static firstOrDefaultConcept;
    InitGraphModel(articlesModel: Iterable<IArticleSpec>, conceptsModel: Iterable<IConceptSpec>): [
        ArticleTerm[],
        Map<ArticleTerm, Iterable<IArticleDefine>>
    ];
    private CreateVertModel;
    private CreateEdgeModel;
    private CreatePendModel;
    private CreatePathModel;
    private CreateTopoModel;
    private MergeEdges;
    private MergePends;
    private MergePaths;
    private MergeVert;
    private static GetArticleTerm;
    private static GetArticleDefs;
}
