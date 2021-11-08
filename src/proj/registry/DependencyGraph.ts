import {ArticleCode} from "../service_types/ArticleCode";
import {IArticleDefine} from "../service_interfaces/IArticleDefine";
import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {IConceptSpec} from "../service_interfaces/IConceptSpec";
import {ArticleDefine} from "../service_types/ArticleDafine";
import {ISpecCode} from "../service_interfaces/ISpecCode";
import {ConceptCode} from "../service_types/ConceptCode";

class ArticleEdge {
    start: ArticleCode;
    stops: ArticleCode;

    constructor(_start: ArticleCode, _stops:ArticleCode) {
        this.start = _start;
        this.stops = _stops;
    }
}

class Queue<T> {
    constructor(items: Iterable<T>) {
        this.elements = Array.from(items);
    }
    elements: Array<T> = new Array();
    isEmpty(): boolean {
        return this.elements.length == 0;
    }
    count(): number {
        return this.elements.length;
    }
    enqueue(item: T) {
        this.elements.push(item);
    }
    dequeue(): T {
        if (!this.isEmpty()) {
            return this.elements.shift();
        }
        return null
    }
    peek(): T {
        if (!this.isEmpty()) {
            return this.elements[0];
        }
        return null;
    }
}

export class DependencyGraph {
    private firstOrDefaultCode =
        function<T extends ISpecCode> (array: Array<T>, item: T): T | undefined {
            return array.find(x => (x.value == item.value));
        };
    private articleDefsDistinctSort(array: Array<IArticleDefine>, order: Array<ArticleCode>): Array<IArticleDefine> {
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
            const xIndex = order.findIndex(finderFun(x));

            const yIndex = order.findIndex(finderFun(y));

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
    private ArticleCodeDistinct = (array: Array<ArticleCode>): Array<ArticleCode> => {
        const distinct = new Array<ArticleCode>();
        array.forEach(x => {
            let found = this.firstOrDefaultCode(distinct, x) != undefined;
            if (!found) {
                distinct.push(x);
            }
        });
        return distinct;
    }
    private firstOrDefaultArticle =
        function (array: Array<IArticleSpec>, item: ArticleCode):
            IArticleSpec | undefined {
            return array.find(x => (x.code.value == item.value));
        };
    private firstOrDefaultConcept =
        function (array: Array<IConceptSpec>, item: ConceptCode):
            IConceptSpec | undefined {
            return array.find(x => (x.code.value == item.value));
        };
    constructor() {
    }
    InitGraphModel(articlesModel:  Iterable<IArticleSpec>,
                   conceptsModel: Iterable<IConceptSpec>):
        [Array<ArticleCode>, Map<ArticleCode, Iterable<IArticleDefine>>] {
        const vertModel: Iterable<ArticleCode> = this.CreateVertModel(articlesModel);
        const edgeModel: Iterable<ArticleEdge> = this.CreateEdgeModel(articlesModel, conceptsModel);
        const pendModel: Iterable<ArticleEdge> = this.CreatePendModel(articlesModel, conceptsModel);

        const order = this.CreateTopoModel(vertModel, edgeModel);
        const paths = this.CreatePathModel(articlesModel, vertModel, pendModel, order);

        return [order, paths];
    }

    private CreateVertModel(articlesModel: Iterable<IArticleSpec>): Iterable<ArticleCode> {
        return Array.from(Array.from(articlesModel).map(a => a.code).sort((x, y) => {
            if (x.value < y.value) return -1;
            if (x.value > y.value) return 1;
            return 0;
        }));
    }

    private CreateEdgeModel(articlesModel: Iterable<IArticleSpec>,
                            conceptsModel: Iterable<IConceptSpec>): Iterable<ArticleEdge> {
        const reduceFunc = (agr: Set<ArticleEdge>, x: IArticleSpec, idx: number, array: Iterable<IArticleSpec>) => {
            return this.MergeEdges(conceptsModel, agr, x);
        }
        const init: Set<ArticleEdge> = new Set<ArticleEdge>();

        return Array.from(Array.from(articlesModel).reduce<Iterable<ArticleEdge>>(reduceFunc, init)).sort((x, y) => {
            if (x.start.value == y.start.value) {
                if (x.stops.value < y.stops.value) return -1;
                if (x.stops.value > y.stops.value) return 1;
                return 0;
            }
            if (x.start.value < y.start.value) return -1;
            if (x.start.value > y.start.value) return 1;
            return 0;
        });
    }

    private CreatePendModel(articlesModel: Iterable<IArticleSpec>,
                            conceptsModel: Iterable<IConceptSpec>): Iterable<ArticleEdge> {
        const reduceFunc = (agr: Set<ArticleEdge>, x: IArticleSpec, idx: number, array: Iterable<IArticleSpec>) => {
            return this.MergePends(conceptsModel, agr, x);
        }
        const init: Set<ArticleEdge> = new Set<ArticleEdge>();

        return Array.from(Array.from(articlesModel).reduce<Iterable<ArticleEdge>>(reduceFunc, init)).sort((x, y) => {
            if (x.start.value == y.start.value) {
                if (x.stops.value < y.stops.value) return -1;
                if (x.stops.value > y.stops.value) return 1;
                return 0;
            }
            if (x.start.value < y.start.value) return -1;
            if (x.start.value > y.start.value) return 1;
            return 0;
        });
    }

    private CreatePathModel(articlesModel: Iterable<IArticleSpec>,
                            vertModel: Iterable<ArticleCode>,
                            edgeModel: Iterable<ArticleEdge>,
                            vertOrder: Iterable<ArticleCode>): Map<ArticleCode, Iterable<IArticleDefine>> {
        return new Map(Array.from(vertModel).map( x => {
            return [x, this.MergePaths(articlesModel, edgeModel, vertOrder, x)];
        }));
    }

    private CreateTopoModel(vertModel: Iterable<ArticleCode>, edgeModel: Iterable<ArticleEdge>): Array<ArticleCode> {
        const degrees = new Map<number, number>(Array.from(vertModel).
            map( x => [x.value, Array.from(edgeModel).reduce<number>((agr, e) => {
                return (e.stops.value == x.value ? agr+1 : agr);
        }, 0)]));

        const articlesOrder = new Array<ArticleCode>();

        const queues = new Queue<number>(Array.from(degrees.entries())
            .filter(x => {
                return (x[1] == 0);
            })
            .map( x => (x[0]))
            .sort((x, y) => {
                if (x < y) return -1;
                if (x > y) return 1;
                return 0;
            })
        );

        let index = 0;
        while (queues.count() != 0) {
            index++
            const article = queues.dequeue();
            articlesOrder.push(ArticleCode.get(article));
            const paths = Array.from(Array.from(edgeModel).filter(x => {
                return (x.start.value == article);
            }).map(x => x.stops));

            paths.forEach(p => {
                const v = degrees.get(p.value);
                degrees.set(p.value, Math.max(0, v-1));
                if (degrees.get(p.value) == 0)
                {
                    queues.enqueue(p.value);
                }
            });
        }
        if (index != Array.from(vertModel).length)
        {
            return new Array<ArticleCode>();
        }
        return articlesOrder;
    }

    private MergeEdges(conceptsModel: Iterable<IConceptSpec>,
                       edgeModel: Set<ArticleEdge>,
                       article: IArticleSpec): Iterable<ArticleEdge> {
        let result = new Set(Array.from(edgeModel));

        const concept = this.firstOrDefaultConcept(Array.from(conceptsModel), article.role);

        if (article != undefined && concept != undefined) {
            Array.from(article.sums).forEach(s => {
                result.add(new ArticleEdge(article.code, s));
            });
            Array.from(concept.path).forEach(p => {
                result.add(new ArticleEdge(p, article.code));
            });
        }
        return result
    }
    private MergePends(conceptsModel: Iterable<IConceptSpec>,
                       edgeModel: Set<ArticleEdge>,
                       article: IArticleSpec): Iterable<ArticleEdge> {
        let result = new Set(Array.from(edgeModel));

        const concept = this.firstOrDefaultConcept(Array.from(conceptsModel), article.role);

        if (article != undefined && concept != undefined) {
            Array.from(concept.path).forEach(p => {
                result.add(new ArticleEdge(p, article.code));
            });
        }
        return result
    }
    private MergePaths(articlesModel: Iterable<IArticleSpec>,
                       edgeModel: Iterable<ArticleEdge>,
                       vertOrder: Iterable<ArticleCode>,
                       article: ArticleCode): Iterable<IArticleDefine> {
        const articleInit = Array.from(edgeModel).
            filter(e => (e.stops.value == article.value)).
            map(e => {
                return this.GetArticleDefs(e.start, articlesModel);
            });
        const articlePath = articleInit.reduce<Iterable<IArticleDefine>>((agr, x) => {
            return this.MergeVert(articlesModel, edgeModel, agr, x);
        }, articleInit);
        return this.articleDefsDistinctSort(Array.from(articlePath), Array.from(vertOrder));
    }
    private MergeVert(articlesModel: Iterable<IArticleSpec>,
                      edgeModel: Iterable<ArticleEdge>,
                      defsModel: Iterable<IArticleDefine>,
                      defs: IArticleDefine): Iterable<IArticleDefine> {
        const resultInit = Array.from(edgeModel).
            filter(e => (e.stops.value == defs.code.value)).
            map(e => {
                return this.GetArticleDefs(e.start, articlesModel);
        });
        const resultList = resultInit.reduce<Iterable<IArticleDefine>>((agr, item) => {
            return this.MergeVert(articlesModel, edgeModel, agr, item);
        }, resultInit);
        return Array.from(Array.from(defsModel).concat(Array.from(resultList))).concat(defs);
    }
    private GetArticleDefs(article: ArticleCode, articlesModel: Iterable<IArticleSpec>): IArticleDefine {
        const articleSpec = this.firstOrDefaultArticle(Array.from(articlesModel), article);
        if (articleSpec == undefined) {
            return ArticleDefine.new();
        }
        return articleSpec.defs();
    }
}