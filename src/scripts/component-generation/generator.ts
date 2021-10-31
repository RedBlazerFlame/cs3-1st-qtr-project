import {
    FC,
    generateComponentData,
    generateRandomId,
    getElementByAlias,
    initialProps,
    rerenderComponent,
} from "./main.js";

// const aliases: Map<string, string> = new Map([]);
const componentStates: Map<string, Object> = new Map([]);

{
    // Getting all Custom Components
    const customComponents = document.querySelectorAll(
        "*[data-component]"
    ) as NodeListOf<HTMLElement>;

    // Setting the ID and classes of each component
    customComponents.forEach((element) => {
        const elementId = `component_${generateRandomId({})}`;
        element.dataset.id = elementId;
        element.classList.add(
            `${element.dataset.componentName
                .charAt(0)
                .toLowerCase()}${element.dataset.componentName.slice(1)}`
        );
        componentStates.set(
            element.dataset.id,
            JSON.parse(element.dataset.props)
        );

        // let elementAlias = element.dataset?.alias;
        // if (typeof elementAlias === "string") {
        //     aliases.set(elementAlias, elementId);
        // }
    });

    (async () => {
        // Generating the initial innerHTML of all custom components
        let generatedData = await Promise.all(
            Array.from(customComponents).map((element) =>
                generateComponentData({
                    component: element,
                    componentState: componentStates.get(element.dataset.id),
                })
            )
        );

        customComponents.forEach((element, index) => {
            // Setting the initial innerHTML of all components based on the generated data
            element.innerHTML = generatedData[index].componentData;

            // Setting up event listeners for all custom components
            // Note that "oninput" event listeners are not working properly yet; however, this should not affect the project as it will probably not make use of "oninput" events
            ["click", "change", "input"].forEach((eventType) => {
                element
                    .querySelectorAll(`[data-${eventType}]`)
                    .forEach((elementWithEventListener) => {
                        (elementWithEventListener as HTMLElement)[
                            `on${eventType}`
                        ] = (ev) =>
                            generatedData[index].callbacks[
                                (elementWithEventListener as HTMLElement)
                                    .dataset[eventType]
                            ]({
                                component: element,
                                event: ev,
                                oldState: componentStates.get(
                                    element.dataset.id
                                ),
                            });
                    });
            });
        });
    })();
}
