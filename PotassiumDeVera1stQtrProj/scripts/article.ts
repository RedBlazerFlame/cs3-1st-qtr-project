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

    // Updating Title
    document.title = articleData.title;
})();
