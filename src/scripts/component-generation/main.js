var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This function picks a random value from an array
export function sampleFromArray({ values }) {
    return values[Math.floor(Math.random() * values.length)];
}
// This function generates a random id for each component
export const DEFAULT_GENERATE_RANDOM_ID_LENGTH = 12;
export const DEFAULT_GENERATE_RANDOM_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-".split("");
export function generateRandomId({ length = DEFAULT_GENERATE_RANDOM_ID_LENGTH, alphabet = DEFAULT_GENERATE_RANDOM_ID_ALPHABET, }) {
    return [...Array(length)]
        .map((_) => sampleFromArray({
        values: alphabet,
    }))
        .join("");
}
// This function gets a reference to a specific element by its id
export function getElementById({ documentObject = document, id, }) {
    try {
        return documentObject.querySelector(`*[data-id="${id}"]`);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
// This function gets a reference to a specific element by its alias
export function getElementByAlias({ documentObject = document, alias, }) {
    try {
        return documentObject.querySelector(`*[data-alias="${alias}"]`);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
// This function generates the component's data
export function generateComponentData({ component, componentState, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield import(`/components/${component.dataset.componentName}.js`)).default(componentState);
    });
}
// This function rerenders a component with new data
export function rerenderComponent({ component, oldState, newProps, }) {
    return __awaiter(this, void 0, void 0, function* () {
        // component.dataset.props = JSON.stringify({
        //     ...oldState,
        //     ...newProps,
        // });
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
// This function returns the component's initial prop values
export function initialProps({ component, }) {
    return JSON.parse(component.dataset.props);
}
