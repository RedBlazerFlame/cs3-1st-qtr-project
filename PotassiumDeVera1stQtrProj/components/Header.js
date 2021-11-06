const Header = (props) => {
    return {
        componentData: `
        <a class="headerLeft" href="/about">
            <img class="headerIcon" src="/images/logo1.png" alt="Site Icon" title="Made by Gabee De Vera">
            <p class="title">
                The Climate Post
            </p>
        </a>
        <div class="searchbar">
            <input id="headerSearchbarInput" placeholder="Search for Articles"/>
            <img id="searchBarIcon" src="/images/magnifyingGlass1.svg" alt="Search Bar Icon" title="Made by Gabee De Vera"/>
        </div>
        `,
        callbacks: {
            onMount: ({ component, oldState, }) => {
                let searchBarInput = document.getElementById("headerSearchbarInput");
                searchBarInput.addEventListener("change", (ev) => {
                    const inputText = ev.target.value;
                    window.location.replace(`/articleList?q=${inputText}`);
                });
            },
        },
        state: props,
    };
};
export default Header;
