import { ArticlesJSON, ArticleData } from "./types.js";
import ArticlePreview from "../components/ArticlePreview.js";

// Declaring Constants and Variables
const urlParameters = new window.URLSearchParams(window.location.search);
const queryString = urlParameters.get("q") ?? "";
const DEBOUNCE_TIME = 400;

// Getting a reference to HTML elements
const resultsElement: HTMLElement = document.querySelector("section.results");
const searchbarInput: HTMLInputElement = document.getElementById(
    "searchbarInput"
) as HTMLInputElement;

// Wrapping code in an async function so that we can await asynchronous responses
(async () => {
    // This will retrieve all of the articles that match the query
    const articlesJSON: ArticlesJSON = await fetch("/json/articles.json").then(
        (res) => res.json()
    );

    // Declaring Functions
    /// This function will find all the matching articles to a certain query string
    function queryArticles(queryString: string): [string, ArticleData][] {
        // This will check if the author, description, title, or tag fields contain the query string
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

        return matchingArticles;
    }

    /// This function will show a list of articles
    function showArticles(matchingArticles: [string, ArticleData][]): void {
        // Showing Results
        const matchingArticlesHTML = matchingArticles
            .map(
                (article) =>
                    ArticlePreview({
                        ...article[1],
                        url: `/article/?id=${article[0]}`,
                        animate: false,
                    }).componentData
            )
            .reduce((acc, cur) => `${acc}${cur}`, "");

        resultsElement.innerHTML = matchingArticlesHTML;
    }

    // Initial search
    showArticles(queryArticles(queryString));

    // This will constantly update the search results after a fixed time interval
    let lastQuery = searchbarInput.value;
    setInterval(() => {
        if (searchbarInput.value !== lastQuery) {
            showArticles(queryArticles(searchbarInput.value));
            lastQuery = searchbarInput.value;
        }
    }, DEBOUNCE_TIME);
})();
