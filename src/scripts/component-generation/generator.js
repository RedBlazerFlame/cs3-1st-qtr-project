import { __awaiter } from "tslib";
import { generateComponentData, generateRandomId, } from "./main.js";
const componentStates = new Map([]);
{
    const customComponents = document.querySelectorAll("*[data-component]");
    customComponents.forEach((element) => {
        const elementId = `component_${generateRandomId({})}`;
        element.dataset.id = elementId;
        element.classList.add(`${element.dataset.componentName
            .charAt(0)
            .toLowerCase()}${element.dataset.componentName.slice(1)}`);
        componentStates.set(element.dataset.id, JSON.parse(element.dataset.props));
    });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        let generatedData = yield Promise.all(Array.from(customComponents).map((element) => generateComponentData({
            component: element,
            componentState: componentStates.get(element.dataset.id),
        })));
        customComponents.forEach((element, index) => {
            element.innerHTML = generatedData[index].componentData;
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
