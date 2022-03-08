import {IPeriod, Period, IBundleProps, BundleProps} from "hravemzdy.legalios";
import { expect } from 'chai';
import {ServiceExample} from "../example/ServiceExample";
import {ArticleCode} from "../../proj/service_types/ArticleCode";
import {ExampleArticleConst, ExampleConceptConst} from "../example/ExampleConstants";
import {ConceptCode} from "../../proj/service_types/ConceptCode";
import {ITermTarget} from "../../proj/service_interfaces/ITermTarget";
import {MonthCode} from "../../proj/service_types/MonthCode";
import {ContractCode} from "../../proj/service_types/ContractCode";
import {PositionCode} from "../../proj/service_types/PositionCode";
import {VariantCode} from "../../proj/service_types/VariantCode";
import {ExampleTermTarget} from "../example/ExampleConcepts";

describe('Procezor Example - Salary-HomeOffice', () => {
    const getTargetsFromDb = function(period: IPeriod): Array<ITermTarget> {
        const CONTRACT_CODE = 0;
        const POSITION_CODE = 0;

        const montCode = MonthCode.getWithPeriod(period);
        const contract = ContractCode.get(CONTRACT_CODE);
        const position = PositionCode.get(POSITION_CODE);
        const variant1 = VariantCode.get(1);
        const targets  = [
            ExampleTermTarget.zero(montCode, contract, position, variant1,
                ArticleCode.get(ExampleArticleConst.ARTICLE_TIMESHT_WORKING),
                ConceptCode.get(ExampleConceptConst.CONCEPT_TIMESHT_WORKING)),
            ExampleTermTarget.zero(montCode, contract, position, variant1,
                ArticleCode.get(ExampleArticleConst.ARTICLE_PAYMENT_SALARY),
                ConceptCode.get(ExampleConceptConst.CONCEPT_AMOUNT_BASIS)),
            ExampleTermTarget.zero(montCode, contract, position, variant1,
                ArticleCode.get(ExampleArticleConst.ARTICLE_ALLOWCE_HOFFICE),
                ConceptCode.get(ExampleConceptConst.CONCEPT_AMOUNT_FIXED)),
        ];
        return targets;
    };

    const testService = new ServiceExample();

    const testVersion = testService.version;
    it(`service version should return 100, got ${testVersion.value}`, () => {
        expect(testVersion.value).to.equal(100);
    });

    const testPeriod = Period.getWithYearMonth(2021, 1);
    it(`period code should return 202101, got ${testVersion.value}`, () => {
        expect(testPeriod.code).to.equal(202101);
    });

    const testLegal: IBundleProps = BundleProps.empty(testPeriod);

    const factoryArticleCode = ArticleCode.get(ExampleArticleConst.ARTICLE_TIMESHT_WORKING)

    const factoryArticle = testService.GetArticleSpec(factoryArticleCode, testPeriod, testVersion)
    it(`article should be valid, got ${factoryArticle}`, () => {
        expect(factoryArticle).to.not.be.null;
        expect(factoryArticle.code.value).to.not.equal(0);
    });

    const factoryConceptCode = ConceptCode.get(ExampleConceptConst.CONCEPT_TIMESHT_WORKING)

    const factoryConcept = testService.GetConceptSpec(factoryConceptCode, testPeriod, testVersion)
    it(`concept should be valid, got ${factoryConcept}`, () => {
        expect(factoryConcept).to.not.be.null;
        expect(factoryConcept.code.value).to.not.equal(0);
    });

    const initService = testService.InitWithPeriod(testPeriod);
    it(`init service should return true, got ${initService}`, () => {
        expect(initService).to.be.true;
    });

    const testArticles: number[] = [80001, 80005, 80002, 80006, 80007, 80010, 80012, 80008, 80009, 80011, 80013];

    const restService = Array.from(testService.GetResults(testPeriod, testLegal, getTargetsFromDb(testPeriod)));
    it(`getting results should return array of length ${testArticles.length}, got ${restService.length}`, () => {
        expect(restService.length).to.equal(testArticles.length);
    });

    restService.forEach((result, index) => {
        if (result.isOk) {
            const resultValue = result.unwrap();
            const articleSymbol = resultValue.articleDescr();
            const conceptSymbol = resultValue.conceptDescr();
            console.log(`Index: ${ index }, ART: ${ articleSymbol }, CON: ${ conceptSymbol }`);
        }
        if (result.isErr) {
            const errorValue = result.error;
            const articleSymbol = errorValue.articleDescr();
            const conceptSymbol = errorValue.conceptDescr();
            console.log(`Index: ${ index }, ART: ${ articleSymbol }, CON: ${ conceptSymbol }, Error: ${ errorValue.message }`);
        }
    });

    const restArticles = restService.filter(x => (x.isOk)).map( x => (x.unwrap().article.value));
    it(`getting results should return same order array, got ${testArticles}`, () => {
        expect(restArticles).to.have.same.members(testArticles);
    });

});