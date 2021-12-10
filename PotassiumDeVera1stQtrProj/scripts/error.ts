import ImageHeader from "../components/ImageHeader.js";
import { ArticlesJSON, ArticleData } from "./types.js";

// Declaring Types
type ErrorCodeDescription = {
    description: string;
    longDescription: string;
};
type ErrorCodeDescriptions = {
    [key: string]: ErrorCodeDescription;
};

// Declaring Constants and Variables
const urlParameters = new window.URLSearchParams(window.location.search);
const errorCode: string = urlParameters.get("code") || "404";

// Getting a reference to HTML Elements
/// Error Code Indicator
const errorCodeIndicatorElement: HTMLSpanElement = document.getElementById(
    "codeNumber"
) as HTMLSpanElement;

/// Short Error Description
const errorDescriptionElement: HTMLSpanElement = document.getElementById(
    "errorDescription"
) as HTMLSpanElement;

/// Long Error Description
const fullErrorDescriptionElement: HTMLParagraphElement =
    document.getElementById("fullErrorDescription") as HTMLParagraphElement;

// Wrapping the code in an async function so that we can await asynchronous requests
(async () => {
    // Getting the Error Code Description
    const errorCodeDescriptions: ErrorCodeDescriptions = await fetch(
        "/json/errorCodes.json"
    ).then((res) => res.json());

    const errorCodeDescription: ErrorCodeDescription =
        errorCodeDescriptions[errorCode];

    // Updating Error Code Indicator Element
    errorCodeIndicatorElement.innerText = errorCode;

    // Updating Short Error Description Element
    errorDescriptionElement.innerText = errorCodeDescription.description;

    // Updating Full Error Description Element
    fullErrorDescriptionElement.innerText =
        errorCodeDescription.longDescription;
})();
