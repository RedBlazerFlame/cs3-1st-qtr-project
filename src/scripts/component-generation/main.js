import { __awaiter } from "tslib";
export function sampleFromArray({ values }) {
    return values[Math.floor(Math.random() * values.length)];
}
export const DEFAULT_GENERATE_RANDOM_ID_LENGTH = 12;
export const DEFAULT_GENERATE_RANDOM_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-".split("");
export function generateRandomId({ length = DEFAULT_GENERATE_RANDOM_ID_LENGTH, alphabet = DEFAULT_GENERATE_RANDOM_ID_ALPHABET, }) {
    return [...Array(length)]
        .map((_) => sampleFromArray({
        values: alphabet,
    }))
        .join("");
}
export function getElementById({ documentObject = document, id, }) {
    try {
        return documentObject.querySelector(`*[data-id="${id}"]`);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
export function getElementByAlias({ documentObject = document, alias, }) {
    try {
        return documentObject.querySelector(`*[data-alias="${alias}"]`);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
export function generateComponentData({ component, componentState, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield import(`/components/${component.dataset.componentName}.js`)).default(componentState);
    });
}
export function rerenderComponent({ component, oldState, newProps, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let generatedData = (yield import(`/components/${component.dataset.componentName}.js`)).default(Object.assign(Object.assign({}, oldState), newProps));
        component.innerHTML = generatedData.componentData;
        ["click", "change", "input"].forEach((eventType) => {
            component
                .querySelectorAll(`[data-${eventType}]`)
                .forEach((clickableElement) => {
                clickableElement[`on${eventType}`] = (ev) => generatedData.callbacks[clickableElement.dataset[eventType]]({ component, event: ev, oldState });
            });
        });
        return generatedData;
    });
}
export function initialProps({ component, }) {
    return JSON.parse(component.dataset.props);
}
