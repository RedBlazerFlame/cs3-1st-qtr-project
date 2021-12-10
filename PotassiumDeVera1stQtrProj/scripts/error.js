var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlParameters = new window.URLSearchParams(window.location.search);
const errorCode = urlParameters.get("code") || "404";
const errorCodeIndicatorElement = document.getElementById("codeNumber");
const errorDescriptionElement = document.getElementById("errorDescription");
const fullErrorDescriptionElement = document.getElementById("fullErrorDescription");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const errorCodeDescriptions = yield fetch("/json/errorCodes.json").then((res) => res.json());
    const errorCodeDescription = errorCodeDescriptions[errorCode];
    errorCodeIndicatorElement.innerText = errorCode;
    errorDescriptionElement.innerText = errorCodeDescription.description;
    fullErrorDescriptionElement.innerText =
        errorCodeDescription.longDescription;
}))();
export {};
