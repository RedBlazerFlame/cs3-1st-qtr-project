var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ArticlePreview from "../components/ArticlePreview.js";
const domParser = new DOMParser();
const articlesList = document.getElementById("articlesList");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const articlesJSON = yield fetch("/json/articles.json").then((res) => res.json());
    const latestArticles = Object.entries(articlesJSON.articles).slice(-3);
    const articleHTMLPreviews = latestArticles.map((articleData) => ArticlePreview({
        icon: articleData[1].icon,
        title: articleData[1].title,
        description: articleData[1].description,
        author: articleData[1].author,
        url: `/article/?id=${articleData[0]}`,
        animate: false,
        theme: "blackAndWhite",
    }));
    articleHTMLPreviews.forEach((preview) => {
        let articleElement = domParser
            .parseFromString(preview.componentData, "text/html")
            .querySelector("div.article");
        articlesList.appendChild(articleElement);
    });
}))();
