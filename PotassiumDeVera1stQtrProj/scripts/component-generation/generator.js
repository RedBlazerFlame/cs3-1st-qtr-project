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
            var _a, _b;
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
            (_b = (_a = generatedData[index].callbacks).onMount) === null || _b === void 0 ? void 0 : _b.call(_a, {
                component: element,
                event: null,
                oldState: componentStates.get(element.dataset.id),
            });
        });
    }))();
}
