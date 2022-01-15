// This represents metadata about an article
export interface ArticleData {
    title: string;
    tags: string;
    author: string;
    datePublished: string;
    description: string;
    icon: {
        alt: string | null;
        title: string | null;
        url: string;
    };
    banner: {
        alt: string | null;
        title: string | null;
        url: string;
    };
    headerCaption: string;
}

// This is the schema of the articles.json
export interface ArticlesJSON {
    articles: {
        [key: string]: ArticleData;
    };
}
