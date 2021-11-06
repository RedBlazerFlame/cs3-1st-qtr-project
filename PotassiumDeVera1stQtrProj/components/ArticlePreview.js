const ArticlePreview = (props) => {
    return {
        componentData: `
        <div class="article">
            <div class="image">
                <img src="${props.icon.url}" ${typeof props.icon.alt === "string" ? `alt=${props.icon.alt}` : ""} ${typeof props.icon.title === "string"
            ? `title=${props.icon.title}`
            : ""} />
            </div>
            <h2 class="title">${props.title}</h2>
            <p class="author">${props.author}</p>
            <p class="description">
                ${props.description}
            </p>
            <a href="${props.url}" class="redirectButton"
                >Read Article »</a
            >
        </div>
        `,
        callbacks: {},
        state: props,
    };
};
export default ArticlePreview;
