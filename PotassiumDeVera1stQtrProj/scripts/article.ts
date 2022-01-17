import ImageHeader from "../components/ImageHeader.js";
import { ArticlesJSON, ArticleData } from "./types.js";

// Declaring Constants and Variables
const urlParameters = new window.URLSearchParams(window.location.search);
const articleId = urlParameters.get("id");

// Getting a reference to HTML Elements
const imageHeader: HTMLElement = document.querySelector("section.imageHeader");
const headerCaption: HTMLElement = document.querySelector(
    "section.headerCaption"
);
const breadcrumbCurrentPage: HTMLLIElement = document.getElementById(
    "breadcrumbCurrentPage"
) as HTMLLIElement;
const articleTitleElement: HTMLElement =
    document.getElementById("articleTitle");
const articleAuthorElement: HTMLSpanElement =
    document.getElementById("articleAuthor");
const articlePublicationDateElement: HTMLParagraphElement =
    document.getElementById("articlePublicationDate") as HTMLParagraphElement;
const articleContentElement: HTMLElement = document.querySelector(
    "section.articleContent"
);
const articleNavigatorCurrentPageNameElement: HTMLElement =
    document.getElementById("articleNavigatorCurrentPageName");
const articleNavigatorPreviousPageNameElement: HTMLElement =
    document.getElementById("articleNavigatorPreviousPageName");
const articleNavigatorNextPageNameElement: HTMLElement =
    document.getElementById("articleNavigatorNextPageName");
const articleNavigatorPreviousPageElement: HTMLElement =
    document.querySelector("div.previous");
const articleNavigatorNextPageElement: HTMLElement =
    document.querySelector("div.next");
const previousPageLinkElement: HTMLAnchorElement = document.querySelector(
    "a.previousPageLink"
) as HTMLAnchorElement;
const nextPageLinkElement: HTMLAnchorElement = document.querySelector(
    "a.nextPageLink"
) as HTMLAnchorElement;

// Wrapping code in an async function so that we can await asynchronous responses
(async () => {
    // This will retrieve all of the article metadata and article content
    const [articlesJSON, articleContent]: [ArticlesJSON, string | null] =
        await Promise.all([
            fetch("/json/articles.json").then((res) => res.json()),
            fetch(`/articles/${articleId}.html`)
                .then((res) => {
                    // If an error occurred, redirect to the error page
                    if (res.status >= 400) {
                        window.location.assign("/error/?code=404");
                        console.log("An error occurred");
                    }

                    return res;
                })
                .then((res) => res.text()),
        ]);

    // This will retrieve the article data for the page
    const articleData: ArticleData | undefined =
        articlesJSON.articles[articleId];

    const articleKeys: string[] = Object.keys(articlesJSON.articles);

    const articleIndex = articleKeys.indexOf(articleId);

    // Updating Image Header
    imageHeader.innerHTML = ImageHeader({
        image: {
            src: articleData.banner.url,
            alt: articleData.banner.alt,
            title: articleData.banner.title,
        },
        showTitle: false,
    }).componentData;

    // Updating Header Caption
    headerCaption.innerHTML = articleData.headerCaption;

    // Updating Breadcrumb
    breadcrumbCurrentPage.innerHTML = articleData.title;

    // Updating Article Header
    articleTitleElement.innerText = articleData.title;
    articleAuthorElement.innerText = articleData.author;
    articlePublicationDateElement.innerText = articleData.datePublished;

    // Inserting Article Content into the page
    articleContentElement.innerHTML = articleContent ?? "";

    // Updating Article Navigator
    articleNavigatorCurrentPageNameElement.innerText = articleData.title;

    if (articleIndex > 0) {
        // Updating the left part of the article navigator
        const previousArticleId = articleKeys[articleIndex - 1];
        const previousArticleData = articlesJSON.articles[previousArticleId];
        articleNavigatorPreviousPageNameElement.innerText =
            previousArticleData.title;
        previousPageLinkElement.href = `/article/?id=${previousArticleId}`;
    } else {
        // Setting the visibility of the left part of the article navigator to hidden
        articleNavigatorPreviousPageElement.style.visibility = "hidden";
    }

    if (articleIndex < Object.keys(articlesJSON.articles).length - 1) {
        // Updating the right part of the article navigator
        const nextArticleId = articleKeys[articleIndex + 1];
        const nextArticleData = articlesJSON.articles[nextArticleId];
        articleNavigatorNextPageNameElement.innerText = nextArticleData.title;
        nextPageLinkElement.href = `/article/?id=${nextArticleId}`;
    } else {
        // Setting the visibility of the right part of the article navigator to hidden
        articleNavigatorNextPageElement.style.visibility = "hidden";
    }

    // Updating Title
    document.title = articleData.title;
})();
