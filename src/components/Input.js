import { rerenderComponent, } from "../scripts/component-generation/main.js";
const Counter = (props) => {
    return {
        componentData: `
        <div>
            <p>value: ${props.value}</p>
            <input data-change="rerender" value="${(props === null || props === void 0 ? void 0 : props.initialInputValue) || ""}" placeholder="${(props === null || props === void 0 ? void 0 : props.placeholder) || ""}"/>
        </div>
        `,
        callbacks: {
            rerender: ({ component, oldState, event, }) => {
                let newValue = event.target.value;
                console.log("rerender");
                if (newValue !== oldState.value) {
                    rerenderComponent({
                        component,
                        oldState,
                        newProps: {
                            value: newValue,
                            initialInputValue: newValue,
                        },
                    });
                }
            },
        },
        state: props,
    };
};
export default Counter;
