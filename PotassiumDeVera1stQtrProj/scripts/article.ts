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

// Wrapping code in an async function so that we can await asynchronous responses
(async () => {
    // This will retrieve all of the article metadata
    const articlesJSON: ArticlesJSON = await fetch("/json/articles.json").then(
        (res) => res.json()
    );

    // This will retrieve the article data for the page
    const articleData: ArticleData = articlesJSON.articles[articleId];

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
})();
