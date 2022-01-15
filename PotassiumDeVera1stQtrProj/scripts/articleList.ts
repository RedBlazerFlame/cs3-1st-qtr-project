import { ArticlesJSON, ArticleData } from "./types.js";
import ArticlePreview from "../components/ArticlePreview.js";

// Declaring Constants and Variables
const urlParameters = new window.URLSearchParams(window.location.search);
const queryString = urlParameters.get("q");

// Getting a reference to HTML elements
const resultsElement: HTMLElement = document.querySelector("section.results");

// Wrapping code in an async function so that we can await asynchronous responses
(async () => {
    // This will retrieve all of the articles that match the query
    const articlesJSON: ArticlesJSON = await fetch("/json/articles.json").then(
        (res) => res.json()
    );

    /// This will check if the author, description, title, or tag fields contain the query string
    let matchingArticles: [string, ArticleData][] = [];
    if (queryString === "") {
        matchingArticles = Object.entries(articlesJSON.articles);
    } else {
        matchingArticles = Object.entries(articlesJSON.articles).filter(
            ([key, articleData]) =>
                [
                    articleData.author,
                    articleData.description,
                    articleData.title,
                    articleData.tags,
                ].some((field) =>
                    field.toLowerCase().includes(queryString.toLowerCase())
                )
        );
    }

    /// TODO Showing Results
    const matchingArticlesHTML = matchingArticles
        .map(
            (article) =>
                ArticlePreview({
                    ...article[1],
                    url: `/article/?id=${article[0]}`,
                }).componentData
        )
        .reduce((acc, cur) => `${acc}${cur}`, "");

    resultsElement.innerHTML = matchingArticlesHTML;
})();
