import {ArticleCode} from "../service_types/ArticleCode";
import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {IConceptSpec} from "../service_interfaces/IConceptSpec";
import {ArticleDefine} from "../service_types/ArticleDafine";
import {ISpecCode} from "../service_interfaces/ISpecCode";
import {ConceptCode} from "../service_types/ConceptCode";
import {ArticleTerm} from "../service_types/ArticleTerm";

class ArticleEdge {
    start: ArticleTerm;
    stops: ArticleTerm;

    constructor(_start: ArticleTerm, _stops:ArticleTerm) {
        this.start = _start;
        this.stops = _stops;
    }
}

class QueueTerm {
    constructor(items: Iterable<ArticleTerm>) {
        this.elements = Array.from(items);
    }
    elements: Array<ArticleTerm> = new Array();
    isEmpty(): boolean {
        return this.elements.length == 0;
    }
    count(): number {
        return this.elements.length;
    }
    enqueue(item: ArticleTerm) {
        this.elements.push(item);
    }
    dequeue(): ArticleTerm {
        if (!this.isEmpty()) {
            return this.elements.shift();
        }
        return null
    }
    peek(): ArticleTerm {
        if (!this.isEmpty()) {
            return this.elements[0];
        }
        return null;
    }
}

export class DependencyGraph {
    private static firstOrDefaultCode =
        function<T extends ISpecCode> (array: Array<T>, item: T): T | undefined {
            return array.find(x => (x.value == item.value));
        };
    private static articleDefsDistinctSort(array: Array<IArticleDefine>, termOrder: Array<ArticleTerm>): Array<IArticleDefine> {
        const codeOrder: Array<ArticleCode> = termOrder.map(x => x.code);
        const finderFun = (defs: IArticleDefine) => {
            return (x: ArticleCode): boolean => {
                return x.value === defs.code.value;
            };
        };
        const compareTo = (xIndex: number, yIndex: number): number => {
            if(xIndex == -1 && yIndex == -1) {
                return 0;
            }

            if (xIndex == -1 && yIndex != -1) {
                return -1;
            }

            if (xIndex != -1 && yIndex == -1) {
                return 1;
            }
            if (xIndex > yIndex) {
                return 1;
            }
            if (xIndex < yIndex) {
                return -1;
            }
            return 0;
        };
        const DefineCompare = (x: IArticleDefine, y: IArticleDefine): number => {
            const xIndex = codeOrder.findIndex(finderFun(x));

            const yIndex = codeOrder.findIndex(finderFun(y));

            return compareTo(xIndex, yIndex);
        };
        const distinct = new Array<IArticleDefine>();
        array.forEach(x => {
            let found = distinct.find(ax => ax.code.value == x.code.value) != undefined;
            if (!found) {
                distinct.push(x);
            }
        });
        return distinct.sort(DefineCompare);
    }
    private static ArticleCodeDistinct = (array: Array<ArticleCode>): Array<ArticleCode> => {
        const distinct = new Array<ArticleCode>();
        array.forEach(x => {
            let found = DependencyGraph.firstOrDefaultCode(distinct, x) != undefined;
            if (!found) {
                distinct.push(x);
            }
        });
        return distinct;
    }
    private static firstOrDefaultArticle =
        function (array: Array<IArticleSpec>, item: ArticleCode):
            IArticleSpec | undefined {
            return array.find(x => (x.code.value == item.value));
        };
    private static firstOrDefaultConcept =
        function (array: Array<IConceptSpec>, item: ConceptCode):
            IConceptSpec | undefined {
            return array.find(x => (x.code.value == item.value));
        };
    constructor() {
    }
    InitGraphModel(articlesModel:  Iterable<IArticleSpec>,
                   conceptsModel: Iterable<IConceptSpec>):
        [Array<ArticleTerm>, Map<ArticleTerm, Iterable<IArticleDefine>>] {
        const vertModel: Iterable<ArticleTerm> = this.CreateVertModel(articlesModel);
        const edgeModel: Iterable<ArticleEdge> = this.CreateEdgeModel(articlesModel, conceptsModel);
        const pendModel: Iterable<ArticleEdge> = this.CreatePendModel(articlesModel, conceptsModel);

        const order = this.CreateTopoModel(vertModel, edgeModel);
        const paths = this.CreatePathModel(articlesModel, vertModel, pendModel, order);

        return [order, paths];
    }

    private CreateVertModel(articlesModel: Iterable<IArticleSpec>): Iterable<ArticleTerm> {
        return Array.from(Array.from(articlesModel).map(a => a.term()).sort(ArticleTerm.compareTo));
    }

    private CreateEdgeModel(articlesModel: Iterable<IArticleSpec>,
                            conceptsModel: Iterable<IConceptSpec>): Iterable<ArticleEdge> {
        const reduceFunc = (agr: Set<ArticleEdge>, x: IArticleSpec, idx: number, array: Iterable<IArticleSpec>) => {
            return this.MergeEdges(articlesModel, conceptsModel, agr, x);
        }
        const init: Set<ArticleEdge> = new Set<ArticleEdge>();

        return Array.from(Array.from(articlesModel).reduce<Iterable<ArticleEdge>>(reduceFunc, init)).sort((x, y) => {
            if (ArticleTerm.compareTo(x.start, y.start)==0) {
                return ArticleTerm.compareTo(x.stops, y.stops);
            }
            return ArticleTerm.compareTo(x.start, y.start);
        });
    }

    private CreatePendModel(articlesModel: Iterable<IArticleSpec>,
                            conceptsModel: Iterable<IConceptSpec>): Iterable<ArticleEdge> {
        const reduceFunc = (agr: Set<ArticleEdge>, x: IArticleSpec, idx: number, array: Iterable<IArticleSpec>) => {
            return this.MergePends(articlesModel, conceptsModel, agr, x);
        }
        const init: Set<ArticleEdge> = new Set<ArticleEdge>();

        return Array.from(Array.from(articlesModel).reduce<Iterable<ArticleEdge>>(reduceFunc, init)).sort((x, y) => {
            if (ArticleTerm.compareTo(x.start, y.start)==0) {
                return ArticleTerm.compareTo(x.stops, y.stops);
            }
            return ArticleTerm.compareTo(x.start, y.start);
        });
    }

    private CreatePathModel(articlesModel: Iterable<IArticleSpec>,
                            vertModel: Iterable<ArticleTerm>,
                            edgeModel: Iterable<ArticleEdge>,
                            vertOrder: Iterable<ArticleTerm>): Map<ArticleTerm, Iterable<IArticleDefine>> {
        return new Map(Array.from(vertModel).map( x => {
            return [x, this.MergePaths(articlesModel, edgeModel, vertOrder, x)];
        }));
    }

    private CreateTopoModel(vertModel: Iterable<ArticleTerm>, edgeModel: Iterable<ArticleEdge>): Array<ArticleTerm> {
        const degrees = new Map<number, [number, number]>(Array.from(vertModel).
            map( x => [x.code.value, [x.seqs.value, Array.from(edgeModel).reduce<number>((agr, e) => {
                return (e.stops.code.value == x.code.value ? agr+1 : agr);
        }, 0)]]));

        const articlesOrder = new Array<ArticleTerm>();

        const queues = new QueueTerm(Array.from(degrees.entries())
            .filter(x => {
                return (x[1][1] == 0);
            })
            .map(x => ArticleTerm.get(x[0], x[1][0]))
            .sort(ArticleTerm.compareTo)
        );

        let index = 0;
        while (queues.count() != 0) {
            index++
            const article = queues.dequeue();
            articlesOrder.push(article);
            const paths = Array.from(Array.from(edgeModel).filter(x => {
                return (x.start.code.value == article.code.value);
            }).map(x => x.stops));

            paths.forEach(p => {
                const v = degrees.get(p.code.value);
                degrees.set(p.code.value, [v[0],Math.max(0, v[1]-1)]);
                if (degrees.get(p.code.value)[1] == 0) {
                    queues.enqueue(p);
                }
            });
        }
        const modelLength = Array.from(vertModel).length;
        if (index != modelLength)
        {
            console.log(`CreateTopoModel, build graph failed: ${index}<>${modelLength}`);
            return new Array<ArticleTerm>();
        }
        return articlesOrder;
    }

    private MergeEdges(articlesModel: Iterable<IArticleSpec>,
                       conceptsModel: Iterable<IConceptSpec>,
                       edgeModel: Set<ArticleEdge>,
                       article: IArticleSpec): Iterable<ArticleEdge> {
        let result = new Set(Array.from(edgeModel));

        const concept = DependencyGraph.firstOrDefaultConcept(Array.from(conceptsModel), article.role);

        if (article != undefined && concept != undefined) {
            Array.from(article.sums).forEach(s => {
                result.add(new ArticleEdge(article.term(), DependencyGraph.GetArticleTerm(s, articlesModel)));
            });
            Array.from(concept.path).forEach(p => {
                result.add(new ArticleEdge(DependencyGraph.GetArticleTerm(p, articlesModel), article.term()));
            });
        }
        return result
    }
    private MergePends(articlesModel: Iterable<IArticleSpec>,
                       conceptsModel: Iterable<IConceptSpec>,
                       edgeModel: Set<ArticleEdge>,
                       article: IArticleSpec): Iterable<ArticleEdge> {
        let result = new Set(Array.from(edgeModel));

        const concept = DependencyGraph.firstOrDefaultConcept(Array.from(conceptsModel), article.role);

        if (article != undefined && concept != undefined) {
            Array.from(concept.path).forEach(p => {
                result.add(new ArticleEdge(DependencyGraph.GetArticleTerm(p, articlesModel), article.term()));
            });
        }
        return result
    }
    private MergePaths(articlesModel: Iterable<IArticleSpec>,
                       edgeModel: Iterable<ArticleEdge>,
                       vertOrder: Iterable<ArticleTerm>,
                       article: ArticleTerm): Iterable<IArticleDefine> {
        const articleInit = Array.from(edgeModel).
            filter(e => (e.stops.code.value == article.code.value)).
            map(e => {
                return DependencyGraph.GetArticleDefs(e.start.code, articlesModel);
            });
        const articlePath = articleInit.reduce<Iterable<IArticleDefine>>((agr, x) => {
            return this.MergeVert(articlesModel, edgeModel, agr, x);
        }, articleInit);
        return DependencyGraph.articleDefsDistinctSort(Array.from(articlePath), Array.from(vertOrder));
    }
    private MergeVert(articlesModel: Iterable<IArticleSpec>,
                      edgeModel: Iterable<ArticleEdge>,
                      defsModel: Iterable<IArticleDefine>,
                      defs: IArticleDefine): Iterable<IArticleDefine> {
        const resultInit = Array.from(edgeModel).
            filter(e => (e.stops.code.value == defs.code.value)).
            map(e => {
                return DependencyGraph.GetArticleDefs(e.start.code, articlesModel);
        });
        const resultList = resultInit.reduce<Iterable<IArticleDefine>>((agr, item) => {
            return this.MergeVert(articlesModel, edgeModel, agr, item);
        }, resultInit);
        return Array.from(Array.from(defsModel).concat(Array.from(resultList))).concat(defs);
    }
    private static GetArticleTerm(article: ArticleCode, articlesModel: Iterable<IArticleSpec>): ArticleTerm {
        const articleSpec = DependencyGraph.firstOrDefaultArticle(Array.from(articlesModel), article);
        if (articleSpec == undefined) {
            return ArticleTerm.new();
        }
        return articleSpec.term();
    }
    private static GetArticleDefs(article: ArticleCode, articlesModel: Iterable<IArticleSpec>): IArticleDefine {
        const articleSpec = DependencyGraph.firstOrDefaultArticle(Array.from(articlesModel), article);
        if (articleSpec == undefined) {
            return ArticleDefine.new();
        }
        return articleSpec.defs();
    }
}