var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import ArticlePreview from "../components/ArticlePreview.js";
const urlParameters = new window.URLSearchParams(window.location.search);
const queryString = (_a = urlParameters.get("q")) !== null && _a !== void 0 ? _a : "";
const DEBOUNCE_TIME = 400;
const resultsElement = document.querySelector("section.results");
const searchbarInput = document.getElementById("searchbarInput");
searchbarInput.value = queryString;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const articlesJSON = yield fetch("/json/articles.json").then((res) => res.json());
    function queryArticles(queryString) {
        let matchingArticles = [];
        if (queryString === "") {
            matchingArticles = Object.entries(articlesJSON.articles);
        }
        else {
            matchingArticles = Object.entries(articlesJSON.articles).filter(([key, articleData]) => [
                articleData.author,
                articleData.description,
                articleData.title,
                articleData.tags,
            ].some((field) => field.toLowerCase().includes(queryString.toLowerCase())));
        }
        return matchingArticles;
    }
    function showArticles(matchingArticles) {
        const matchingArticlesHTML = matchingArticles
            .map((article) => ArticlePreview(Object.assign(Object.assign({}, article[1]), { url: `/article/?id=${article[0]}`, animate: false })).componentData)
            .reduce((acc, cur) => `${acc}${cur}`, "");
        resultsElement.innerHTML = matchingArticlesHTML;
    }
    showArticles(queryArticles(queryString));
    let lastQuery = queryString;
    setInterval(() => {
        if (searchbarInput.value !== lastQuery) {
            showArticles(queryArticles(searchbarInput.value));
            lastQuery = searchbarInput.value;
        }
    }, DEBOUNCE_TIME);
}))();
