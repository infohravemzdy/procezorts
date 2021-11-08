import {IArticleSpec} from "../service_interfaces/IArticleSpec";
import {ArticleCode} from "../service_types/ArticleCode";
import {ISpecFactory} from "./ISpecFactory";
import {IArticleSpecProvider} from "../registry_providers/IArticleSpecProvider";

export interface IArticleSpecFactory extends ISpecFactory<IArticleSpecProvider, IArticleSpec, ArticleCode> {
}