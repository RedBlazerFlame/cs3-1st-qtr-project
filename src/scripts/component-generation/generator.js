var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generateComponentData, generateRandomId, } from "./main.js";
// const aliases: Map<string, string> = new Map([]);
const componentStates = new Map([]);
{
    // Getting all Custom Components
    const customComponents = document.querySelectorAll("*[data-component]");
    // Setting the ID and classes of each component
    customComponents.forEach((element) => {
        const elementId = `component_${generateRandomId({})}`;
        element.dataset.id = elementId;
        element.classList.add(`${element.dataset.componentName
            .charAt(0)
            .toLowerCase()}${element.dataset.componentName.slice(1)}`);
        componentStates.set(element.dataset.id, JSON.parse(element.dataset.props));
        // let elementAlias = element.dataset?.alias;
        // if (typeof elementAlias === "string") {
        //     aliases.set(elementAlias, elementId);
        // }
    });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        // Generating the initial innerHTML of all custom components
        let generatedData = yield Promise.all(Array.from(customComponents).map((element) => generateComponentData({
            component: element,
            componentState: componentStates.get(element.dataset.id),
        })));
        customComponents.forEach((element, index) => {
            // Setting the initial innerHTML of all components based on the generated data
            element.innerHTML = generatedData[index].componentData;
            // Setting up event listeners for all custom components
            // Note that "oninput" event listeners are not working properly yet; however, this should not affect the project as it will probably not make use of "oninput" events
            ["click", "change", "input"].forEach((eventType) => {
                element
                    .querySelectorAll(`[data-${eventType}]`)
                    .forEach((elementWithEventListener) => {
                    elementWithEventListener[`on${eventType}`] = (ev) => generatedData[index].callbacks[elementWithEventListener
                        .dataset[eventType]]({
                        component: element,
                        event: ev,
                        oldState: componentStates.get(element.dataset.id),
                    });
                });
            });
        });
    }))();
}
