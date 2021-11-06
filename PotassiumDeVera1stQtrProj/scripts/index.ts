import ArticlePreview from "../components/ArticlePreview.js";
import { ArticleData, ArticlesJSON } from "./types";

// Declaring Constants and Variables
const domParser: DOMParser = new DOMParser();

// Getting a reference to the HTML Elements
const articlesList: HTMLDivElement = document.getElementById(
    "articlesList"
) as HTMLDivElement;

// Wrapping code inside an async block so that we can use await
(async () => {
    // This will retrieve all of the article metadata
    const articlesJSON: ArticlesJSON = await fetch("/json/articles.json").then(
        (res) => res.json()
    );

    // This will retrieve the 3 latest articles
    const latestArticles: [string, ArticleData][] = Object.entries(
        articlesJSON.articles
    ).slice(-3);

    const articleHTMLPreviews: ReturnType<typeof ArticlePreview>[] =
        latestArticles.map((articleData) =>
            ArticlePreview({
                icon: articleData[1].icon,
                title: articleData[1].title,
                description: articleData[1].description,
                author: articleData[1].author,
                url: `/article/?id=${articleData[0]}`,
            })
        );
    articleHTMLPreviews.forEach((preview) => {
        // Parsing the HTML string and then appending it as a child of the articles list
        articlesList.appendChild(
            domParser
                .parseFromString(preview.componentData, "text/html")
                .querySelector("div.article")
        );
    });
})();
