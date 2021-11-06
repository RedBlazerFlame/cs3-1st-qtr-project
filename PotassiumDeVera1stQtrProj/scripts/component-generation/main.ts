// Declaring Types
export type FC<T extends Object> = (props: T) => {
    componentData: string;
    callbacks: {
        [key: string]: ({
            component: HTMLElement,
            oldState: Object,
            event: Event,
        }) => void;
    };
    state: T;
};

// This function picks a random value from an array
export function sampleFromArray<T>({ values }: { values: T[] }): T {
    return values[Math.floor(Math.random() * values.length)];
}

// This function generates a random id for each component
export const DEFAULT_GENERATE_RANDOM_ID_LENGTH = 12;
export const DEFAULT_GENERATE_RANDOM_ID_ALPHABET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-".split("");

export function generateRandomId({
    length = DEFAULT_GENERATE_RANDOM_ID_LENGTH,
    alphabet = DEFAULT_GENERATE_RANDOM_ID_ALPHABET,
}: {
    length?: number;
    alphabet?: string[];
}): string {
    return [...Array(length)]
        .map((_) =>
            sampleFromArray({
                values: alphabet,
            })
        )
        .join("");
}

// This function gets a reference to a specific element by its id
export function getElementById({
    documentObject = document,
    id,
}: {
    documentObject?: Document;
    id: string;
}): HTMLElement | undefined {
    try {
        return documentObject.querySelector(`*[data-id="${id}"]`);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

// This function gets a reference to a specific element by its alias
export function getElementByAlias({
    documentObject = document,
    alias,
}: {
    documentObject?: Document;
    alias: string;
}): HTMLElement | undefined {
    try {
        return documentObject.querySelector(`*[data-alias="${alias}"]`);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

// This function generates the component's data
export async function generateComponentData({
    component,
    componentState,
}: {
    component: HTMLElement;
    componentState: Object;
}): Promise<ReturnType<FC<{}>>> {
    return (
        await import(`/components/${component.dataset.componentName}.js`)
    ).default(componentState);
}

// This function rerenders a component with new data
export async function rerenderComponent<T extends FC<any>>({
    component,
    oldState,
    newProps,
}: {
    component: HTMLElement;
    oldState: Pick<ReturnType<T>, "state">["state"];
    newProps: Partial<Pick<ReturnType<T>, "state">["state"]>;
}): Promise<ReturnType<T>> {
    // component.dataset.props = JSON.stringify({
    //     ...oldState,
    //     ...newProps,
    // });
    let generatedData = (
        await import(`/components/${component.dataset.componentName}.js`)
    ).default({
        ...oldState,
        ...newProps,
    });
    component.innerHTML = generatedData.componentData;
    ["click", "change", "input"].forEach((eventType) => {
        component
            .querySelectorAll(`[data-${eventType}]`)
            .forEach((clickableElement) => {
                (clickableElement as HTMLElement)[`on${eventType}`] = (ev) =>
                    generatedData.callbacks[
                        (clickableElement as HTMLElement).dataset[eventType]
                    ]({ component, event: ev, oldState });
            });
    });

    return generatedData;
}

// This function returns the component's initial prop values
export function initialProps({
    component,
}: {
    component: HTMLElement;
}): Object {
    return JSON.parse(component.dataset.props);
}
