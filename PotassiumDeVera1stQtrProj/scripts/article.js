var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ImageHeader from "../components/ImageHeader.js";
const urlParameters = new window.URLSearchParams(window.location.search);
const articleId = urlParameters.get("id");
const imageHeader = document.querySelector("section.imageHeader");
const headerCaption = document.querySelector("section.headerCaption");
const breadcrumbCurrentPage = document.getElementById("breadcrumbCurrentPage");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const articlesJSON = yield fetch("/json/articles.json").then((res) => res.json());
    const articleData = articlesJSON.articles[articleId];
    imageHeader.innerHTML = ImageHeader({
        image: {
            src: articleData.banner.url,
            alt: articleData.banner.alt,
            title: articleData.banner.title,
        },
        showTitle: false,
    }).componentData;
    headerCaption.innerHTML = articleData.headerCaption;
    breadcrumbCurrentPage.innerHTML = articleData.title;
}))();
