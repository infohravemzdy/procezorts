import { IArticleSpec } from "../service_interfaces/IArticleSpec";
import { ArticleCode } from "../service_types/ArticleCode";
import { ISpecProvider } from "./ISpecProvider";
export interface IArticleSpecProvider extends ISpecProvider<IArticleSpec, ArticleCode> {
}
