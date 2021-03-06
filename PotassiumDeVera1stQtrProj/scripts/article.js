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
const articleTitleElement = document.getElementById("articleTitle");
const articleAuthorElement = document.getElementById("articleAuthor");
const articlePublicationDateElement = document.getElementById("articlePublicationDate");
const articleContentElement = document.querySelector("section.articleContent");
const articleNavigatorCurrentPageNameElement = document.getElementById("articleNavigatorCurrentPageName");
const articleNavigatorPreviousPageNameElement = document.getElementById("articleNavigatorPreviousPageName");
const articleNavigatorNextPageNameElement = document.getElementById("articleNavigatorNextPageName");
const articleNavigatorPreviousPageElement = document.querySelector("div.previous");
const articleNavigatorNextPageElement = document.querySelector("div.next");
const previousPageLinkElement = document.querySelector("a.previousPageLink");
const nextPageLinkElement = document.querySelector("a.nextPageLink");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const [articlesJSON, articleContent] = yield Promise.all([
        fetch("/json/articles.json").then((res) => res.json()),
        fetch(`/articles/${articleId}.html`)
            .then((res) => {
            if (res.status >= 400) {
                window.location.assign("/error/?code=404");
                console.log("An error occurred");
            }
            return res;
        })
            .then((res) => res.text()),
    ]);
    const articleData = articlesJSON.articles[articleId];
    const articleKeys = Object.keys(articlesJSON.articles);
    const articleIndex = articleKeys.indexOf(articleId);
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
    articleTitleElement.innerText = articleData.title;
    articleAuthorElement.innerText = articleData.author;
    articlePublicationDateElement.innerText = articleData.datePublished;
    articleContentElement.innerHTML = articleContent !== null && articleContent !== void 0 ? articleContent : "";
    articleNavigatorCurrentPageNameElement.innerText = articleData.title;
    if (articleIndex > 0) {
        const previousArticleId = articleKeys[articleIndex - 1];
        const previousArticleData = articlesJSON.articles[previousArticleId];
        articleNavigatorPreviousPageNameElement.innerText =
            previousArticleData.title;
        previousPageLinkElement.href = `/article/?id=${previousArticleId}`;
    }
    else {
        articleNavigatorPreviousPageElement.style.visibility = "hidden";
    }
    if (articleIndex < Object.keys(articlesJSON.articles).length - 1) {
        const nextArticleId = articleKeys[articleIndex + 1];
        const nextArticleData = articlesJSON.articles[nextArticleId];
        articleNavigatorNextPageNameElement.innerText = nextArticleData.title;
        nextPageLinkElement.href = `/article/?id=${nextArticleId}`;
    }
    else {
        articleNavigatorNextPageElement.style.visibility = "hidden";
    }
    document.title = articleData.title;
}))();
