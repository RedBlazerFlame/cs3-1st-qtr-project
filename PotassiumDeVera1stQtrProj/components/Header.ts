import { FC } from "../scripts/component-generation/main.js";

interface HeaderProps {}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
    return {
        componentData: `
        <a class="headerLeft" href="/">
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
            onMount: ({
                component,
                oldState,
            }: {
                component: HTMLElement;
                oldState: Object;
            }) => {
                // Once the component is rendered, attach an event listener to the searchbar so that users can search
                let searchBarInput: HTMLInputElement = document.getElementById(
                    "headerSearchbarInput"
                ) as HTMLInputElement;
                searchBarInput.addEventListener("change", (ev) => {
                    const inputText = (ev.target as HTMLInputElement).value;

                    // Redirecting the user to the searchpage and displaying results
                    window.location.replace(`/articleList?q=${inputText}`);
                });

                // Attach an event listener to the searchbar icon so that mobile users can go to the searchpage too
                let searchBarIcon: HTMLImageElement = document.getElementById(
                    "searchBarIcon"
                ) as HTMLImageElement;
                searchBarIcon.addEventListener("click", (_) => {
                    const inputText = searchBarInput.value;

                    // Redirecting the user to the searchpage and displaying results
                    window.location.replace(
                        `/articleList${
                            inputText !== "" ? `?q=${inputText}` : ""
                        }`
                    );
                });

                // If there is a "q" URL parameter, set the value of the input box (in the search bar) to the value of that URL parameter
                const urlParameters = new window.URLSearchParams(
                    window.location.search
                );
                const queryString = urlParameters.get("q");

                /// Getting a reference to HTML Elements
                const searchBarElement: HTMLInputElement =
                    document.getElementById(
                        "headerSearchbarInput"
                    ) as HTMLInputElement;

                /// Changing the text in the searchbar element
                searchBarElement.value = queryString;
            },
        },
        state: props,
    };
};

export default Header;
